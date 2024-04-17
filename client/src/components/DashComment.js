import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Table, Modal, TableBody } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");

  // console.log(userPosts);

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/comment/getComments`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        // console.log(data);
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      getComments();
    }
  }, [currentUser._id]);

  // show more
  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `http://localhost:4000/api/user/getComments?startIndex=${startIndex}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HandleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `http://localhost:4000/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-400
    dark:scrollbar-track-teal-100 dark:scrollbar-thumb-teal-400"
    >
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable Classname="shadow-md">
            <Table.Head>
              <Table.HeadCell> Date Created</Table.HeadCell>
              <Table.HeadCell> Comment Content</Table.HeadCell>
              <Table.HeadCell> No. of Likes</Table.HeadCell>
              <Table.HeadCell> PostId </Table.HeadCell>
              <Table.HeadCell> UserId </Table.HeadCell>
              <Table.HeadCell> Delete</Table.HeadCell>
            </Table.Head>
            {comments.map((comment) => (
              <Table.Body className="divide-y" key={comment._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{comment.content}</Table.Cell>
                  <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  <Table.Cell>{comment.postId}</Table.Cell>
                  <Table.Cell>{comment.userId}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-teal-500 w-full text- sm self-center py-7 hover:text-teal-300"
            >
              Show More
            </button>
          )}
        </>
      ) : (
        <p>You have no comments Yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size={"md"}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto " />

            <h3 className="mb-5 text-gray-500 dark:text-gray-400 text-lg text-center">
              Are you sure! <br /> You want to delete this comment?
            </h3>
            <div className=" flex justify-center gap-6">
              <Button color={"failure"} onClick={HandleDeleteComment}>
                Yes! I'm Sure
              </Button>
              <Button color={"gray"} onClick={() => setShowModal(false)}>
                No, Canceal
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
