import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidenav from "../Sidenav";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LoadLead } from "../../actions/index";
import LoaderTemplate from "../templates/LoaderTemplate";

const Lead = () => {
  const results = useSelector((state) => state.lead);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const url =
      "https://glacial-castle-08491.herokuapp.com/api/employeedashboard/lead";
    const getLeads = async () => {
      console.log(token);
      axios({
        url: url,
        method: "get",
        headers: {
          "auth-token": token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          setIsLoading(false);
          dispatch(LoadLead(response.data));
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    };
    getLeads();
  }, [dispatch]);

  return (
    <React.Fragment>
      {isLoading && <LoaderTemplate title={`Leads`} />}
      {!isLoading && (
        <div className="dashboard">
          <div className="sidebar">
            <Sidenav />
          </div>
          <div className="main-content">
            <div className="header">
              <div className="title">Leads</div>
            </div>
            <hr />
            <div className="content">
              <ul>
                {results.map((result) => (
                  <li key={result._id}>
                    <p>{result.title}</p>
                    <Link to={`/employeedashboard/lead/${result._id}`}>
                      <i className="material-icons">&#xe5c8;</i>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Lead;
