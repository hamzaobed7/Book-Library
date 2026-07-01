import { useContext, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "../Css/AddBook.css";
import SimpleSnackbar from "../Componants/Snakbar";
import api from "../api/axios";
import { BookContext } from "./../Context/BookContext";

const schema = z.object({
  name: z.string().min(3, "The Name of Categpry must be grater than 3").max(20, "lower than 30 characters"),
  description: z.string().min(5, "The description is too short").max(250, "The description is too long"),
});

export default function AddCategory() {
  const [open, setOpen] = useState(false);
  const [mes, setMes] = useState("");
  const { fetchCategories } = useContext(BookContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(()=>{fetchCategories()},[fetchCategories])
  
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
    };


    try {
      const response = await api.post("/categories", formattedData);
      setOpen(true);
      setMes("The Category Added Successful");
      reset();
      fetchCategories();
    } catch (error) {
      console.log("ERROR:", error.response?.data || error.message);
      setMes(error.response?.data.message || error.message);
      setOpen(true);
    }
  };

  return (
    <>
      <div className="parent-div">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h1 style={{ color: "#667eea" }}>Add Category</h1>

          <input type="text" placeholder="Type" {...register("name")} className="input-form" />
          <p style={{ color: "red" }}>{errors.name?.message}</p>

          <input type="text" placeholder="description" {...register("description")} className="input-form" />
          <p style={{ color: "red" }}>{errors.description?.message}</p>
          <br />
          <button type="submit">Add Category</button>
        </form>
      </div>

      <SimpleSnackbar message={mes} handleClose={handleClose} open={open} />
    </>
  );
}
