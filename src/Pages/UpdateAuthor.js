import { useState, useContext } from "react";
import "../Css/AddBook.css";
import SimpleSnackbar from "../Componants/Snakbar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../api/axios";
import { BookContext } from "../Context/BookContext";


const schema = z.object({
  id: z.union([z.string(), z.number()]),
  first_name: z.string().min(3, "The name is very short").max(30, "The name is very long"),
  last_name: z.string().min(3, "The name is very short").max(30, "The name is very long"),
  email: z.string().email("Must be a valid Email"), 
  gender: z.enum(["Male", "Female"], { errorMap: () => ({ message: "Please select gender" }) }),
  birth_date: z.coerce.date().refine((date) => date < new Date(), "The date must be in the past"),
  bio: z.string().min(3, "The bio must be greater than 3").max(200, "The bio is very long"),
});

export default function UpdateAuthor() {
  const [open, setOpen] = useState(false);
  const [Mes, setmes] = useState("");
  const [color, setcolor] = useState("");
  const { authors } = useContext(BookContext);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleAuthorChange = (e) => {
    const SelectedId = e.target.value;
    const selectedAuthor = authors.find((author) => String(author.id) === String(SelectedId));

    if (selectedAuthor) {
      setValue("id", selectedAuthor.id);
      setValue("first_name", selectedAuthor.first_name);
      setValue("last_name", selectedAuthor.last_name);
      setValue("email", selectedAuthor.email);
      setValue("gender", selectedAuthor.gender);
      setValue("bio", selectedAuthor.bio);
      if (selectedAuthor.birth_date) {
        const formattedDate = new Date(selectedAuthor.birth_date).toISOString().split("T")[0];
        setValue("birth_date", formattedDate);
      }
    }
  };

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      birth_date: data.birth_date.toISOString().split("T")[0],
    };

    try {
      const response = await api.put(`/authors/${formattedData.id}`, formattedData);
      setmes(response.data.message || "Updated successfully");
      setcolor("success");
      setOpen(true);
      reset();
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Something went wrong";
      setmes(errorMessage);
      setcolor("error");
      setOpen(true);
    }
  };

  return (
    <>
      <div className="parent-div">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h1 style={{ color: "#667eea" }}>Updating author</h1>

          <select onChange={handleAuthorChange} className="Select-form">
            <option value="">Select Author</option>
            {authors &&
              authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.first_name} {author.last_name}
                </option>
              ))}
          </select>
          <br />
          <br />

          <input type="hidden" {...register("id")} />

          <input placeholder="First Name" {...register("first_name")} className="input-form" />
          <p style={{ color: "red" }}>{errors.first_name?.message}</p>

          <input placeholder="Last Name" {...register("last_name")} className="input-form" />
          <p style={{ color: "red" }}>{errors.last_name?.message}</p>

          <input type="email" placeholder="Email" {...register("email")} className="input-form" />
          <p style={{ color: "red" }}>{errors.email?.message}</p>

          <input type="date" {...register("birth_date")} className="input-form-date" />
          <p style={{ color: "red" }}>{errors.birth_date?.message}</p>

          <input placeholder="Bio" type="text" {...register("bio")} className="input-form" />
          <p style={{ color: "red" }}>{errors.bio?.message}</p>

          <select {...register("gender")} className="Select-form">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <p style={{ color: "red" }}>{errors.gender?.message}</p>

          <br />
          <br />

          <button type="submit">Update author</button>
        </form>
      </div>

      <SimpleSnackbar message={Mes} color={color} handleClick={() => setOpen(true)} handleClose={() => setOpen(false)} open={open} />
    </>
  );
}
