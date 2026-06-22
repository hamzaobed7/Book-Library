import { useState, useContext } from "react";
import "../Css/AddBook.css";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SimpleSnackbar from "../Componants/Snakbar";
import { BookContext } from './../Context/BookContext';
const schema = z.object({
  first_name: z.string("must be string").max(30, "the name is very long").min(3, "the name is Very small"),
  last_name: z.string("must be string").max(30, "the name is very long").min(3, "the name is Very small"),
  email: z.email("must be enter valid Email"),
  gender: z.enum(["Male", "Female"]),
  birth_date: z.coerce.date().refine((date) => date < new Date(), "the Date must be after this Day"),
  bio: z.string("enter the bio").max(200, "the bio is very long").min(3, "the bio must be grater than 3"),
});
export default function AddAuthor() {
  const { authors } = useContext(BookContext);
  const [ms, Setms] = useState("");
  const [color, setcolor] = useState("");
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleClick = () => setOpen(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const onSubmit = async (data) => {
    const isAuthorExist = authors.some((author) =>
       author.email.toLowerCase() === data.email.toLowerCase() 
    || (author.first_name.toLowerCase() === data.first_name.toLowerCase() && author.last_name.toLowerCase()===data.last_name.toLowerCase()));

    if (isAuthorExist) {
      setOpen(true);
      Setms("Author already exists");
      setcolor("error");
      return;
    }

    const formattedData = {
      ...data,
      birth_date: data.birth_date.toISOString().split("T")[0],
    };
     
    const token=localStorage.getItem('token')
    try {
      const response = await fetch("http://127.0.0.1:8000/api/authors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify(formattedData),
      });
      Setms(" Add Author sucsses");
      setcolor("success");
      setOpen(true);
      reset();
    } catch (error) {
      console.log("ERROR:", error);
       Setms(error.response?.data.message || error.message);
      setcolor("error");
      setOpen(true);
    }
  };

  return (
    <>
      <div className="parent-div">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h1 style={{ color: "#667eea" }}>Add Author</h1>

          <input type="text" placeholder="First Name" {...register("first_name")} required className="input-form" />
          <p style={{ color: "red" }}>{errors.first_name?.message}</p>

          <input type="text" placeholder="Last Name" {...register("last_name")} required className="input-form" />
          <p style={{ color: "red" }}>{errors.last_name?.message}</p>

          <input type="email" required placeholder="email" {...register("email")} className="input-form" />
          <p style={{ color: "red" }}>{errors.email?.message}</p>

          <select
            onChange={(e) => {
              setValue("gender", e.target.value);
            }}
            className="Select-form"
            required
            {...register("gender")}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <p style={{ color: "red" }}>{errors.gender?.message}</p>

          <input type="text" placeholder="Bio" {...register("bio")} required className="input-form" />
          <p style={{ color: "red" }}>{errors.bio?.message}</p>
         
          <input type="date" {...register("birth_date")} required className="input-form-date" />
          <p style={{ color: "red" }}>{errors.birth_date?.message}</p>

          <br />

          <button type="submit">Add New Author</button>
        </form>
      </div>
      <SimpleSnackbar message={ms} color={color} handleClick={handleClick} handleClose={handleClose} open={open} />
    </>
  );
}
