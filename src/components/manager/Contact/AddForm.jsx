import React, { useState } from "react";
import Sidenav from "../Sidenav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import LoaderTemplate from "../templates/LoaderTemplate";

const AddForm = () => {
  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const token = localStorage.getItem("token");

  const [isLoading, setIsLoading] = useState(false);

  const url =
    "https://glacial-castle-08491.herokuapp.com/api/managerdashboard/contact";

  const successNotify = () => toast.success("Succesfully Added");
  const failedNotify = (message) => toast.error(message);

  const addContact = (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (!title || !client || !number || !email || !address) {
      failedNotify("Please fill out all the fields");
      return;
    }

    const response = {
      title: title,
      client: client,
      number: number,
      email: email,
      address: address,
    };
    axios({
      url: url,
      method: "POST",
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
      },
      data: response,
    })
      .then((response) => {
        console.log(response);
        if (response.status === 400) {
          failedNotify("Oops! we are facing some issue try again later");
          setIsLoading(false);
        } else if (response.status === 200) {
          successNotify();
          setIsLoading(false);
          setTitle("");
          setClient("");
          setNumber("");
          setEmail("");
          setAddress("");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  return (
    <React.Fragment>
      {isLoading && (
        <LoaderTemplate
          title={`Contact`}
          isAdd={false}
          link={``}
          content={`Adding`}
        />
      )}
      {!isLoading && (
        <React.Fragment>
          <ToastContainer />
          <div className="dashboard">
            <div className="sidebar">
              <Sidenav />
            </div>
            <div className="main-content">
              <div className="header">
                <div className="title">Contact</div>
              </div>
              <hr />
              <div className="content">
                <div className="add-form">
                  <input
                    type="text"
                    name="title"
                    placeholder="title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <input
                    type="text"
                    name="client"
                    placeholder="client"
                    onChange={(e) => setClient(e.target.value)}
                  />
                  <input
                    type="number"
                    name="number"
                    placeholder="number"
                    onChange={(e) => setNumber(e.target.value)}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="address"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <div className="button-container">
                    <button onClick={(e) => addContact(e)}>Add Contact</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default AddForm;
