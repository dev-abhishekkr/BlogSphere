import React from "react";
import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreatePost() {
  return (
    <>
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl font-semibold my-7">
          Create new Blog
        </h1>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput
              type="text"
              required
              id="title"
              placeholder="Title"
              className="flex-1"
            />
            <Select>
              <option value={"UnCategorized"}>Select a Category</option>
              <option value={"Javascript"}>Javascript</option>
              <option value={"nextjs"}>Next.Js</option>
              <option value={"reactjs"}>React.Js</option>
              <option value={"expressjs"}>Express.Js</option>
            </Select>
          </div>
          <div
            className="flex gap-4 item-center justify-between border-4 border-dotted
           border-teal-500 p-3"
          >
            <FileInput typeof="file" accept="image/*" />
            <Button
              type="button"
              gradientDuoTone={"purpleToBlue"}
              size={"sm"}
              outline
            >
              Upload Image
            </Button>
          </div>
          <ReactQuill
            theme="snow"
            placeholder="Write your blog Content"
            className="h-72 mb-12"
            required
          />
          <Button type="submit" gradientDuoTone={"purpleToPink"}>
            Publish
          </Button>
        </form>
      </div>
    </>
  );
}