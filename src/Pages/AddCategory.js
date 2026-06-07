import { useState} from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "../Css/AddBook.css";
import SimpleSnackbar from "../Componants/Snakbar";
import api from "../api/axios";

const schema = z.object({  
name: z.string().min(3, "The Name of Categpry must be grater than 3").max(20,"lower than 30 characters"),
description: z.string().min(5, "The description is too short").max(250, "The description is too long"),
});

export default function AddCategory() {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit,reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const handleClick = () => setOpen(true);
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
      reset();
    } catch (error) {
      console.log("ERROR:", error.response?.data || error.message);
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

      <SimpleSnackbar message={"Category Added Successfully"} handleClose={handleClose} open={open} />
    </>
  );
}