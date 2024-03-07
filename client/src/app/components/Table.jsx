"use client";
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import Form from "./form";
import api from "../api/appApi";
import EditForm from "./EditForm";
import DeleteItem from "./DeleteItem";
import { useFetchContext } from "../context/fetchContext";
import SendData from "./SendData";

const Table = () => {
  const { fetchAgain } = useFetchContext();
  const [data, setData] = useState();
  const [loaded, setLoaded] = useState(false);
  const [isSending, SetIsSending] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  console.log("Selected rows: ", selectedRows);
  // Handle Selection
  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelectedRows) => ({
      ...prevSelectedRows,
      [id]: !prevSelectedRows[id],
    }));
  };

  // Handle SendEmail
  const handleSendEmail = async () => {
    SetIsSending(true);
    try {
      // Filter out only the selected rows
      const selectedData = data.filter((item) => selectedRows[item._id]);
      console.log(selectedData, "data...");
      const response = await api.post("/api/send-email/", {
        selectedRows: selectedData,
      });
      console.log("Email sent successfully:", response.data);
      setSelectedRows({});
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      SetIsSending(false);
    }
  };
  // Fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/");
        setData(response.data);
      } catch (error) {
        console.error(error?.message);
      } finally {
        setLoaded(true);
      }
    };
    fetchData();
  }, [fetchAgain]);

  const columns = ["ID", "Username", "Phone Number", "Email", "Hobbies"];
  return (
    <>
      <div className="flex flex-col">
        {loaded ? (
          <>
            <Form />
            <div className="h-[50vh] overflow-y-auto my-5">
              <table className="border-collapse w-full">
                <thead className="sticky -top-[1px] z-10 bg-white">
                  <tr>
                    <th className="p-1 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                      Select
                    </th>
                    {columns.map((column, i) => (
                      <th
                        key={i}
                        className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
                      >
                        {column}
                      </th>
                    ))}
                    <th className="p-1 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {data.length === 0 && (
                    <p className="mt-5">No previous data available</p>
                  )}
                  {data.length >= 0 &&
                    data?.map((data, i) => (
                      <tr
                        key={data._id}
                        className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
                      >
                        <td className="w-fit max-w-[20vw] break-words lg:w-auto p-1 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                          <input
                            type="checkbox"
                            checked={selectedRows[data._id] || false}
                            onChange={() => handleCheckboxChange(data._id)}
                            className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                        </td>
                        <td className="w-fit max-w-[20vw] break-words lg:w-auto p-1 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                          <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                            {columns[0]}
                          </span>
                          {i + 1}
                        </td>
                        <td className="w-fit max-w-[20vw] break-words lg:w-auto p-1 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                          <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                            {columns[1]}
                          </span>
                          {data.username}
                        </td>
                        <td className="w-fit max-w-[20vw] break-words lg:w-auto p-1 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                          <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                            {columns[2]}
                          </span>
                          {data.phone}
                        </td>
                        <td className="w-fit max-w-[20vw] break-words lg:w-auto p-1 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                          <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                            {columns[3]}
                          </span>
                          {data.email}
                        </td>
                        <td className="w-fit max-w-[20vw] break-words lg:w-auto p-1 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                          <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                            {columns[4]}
                          </span>
                          {data.hobbies}
                        </td>
                        <td className="w-fit max-w-[20vw] lg:w-auto py-1 px-2 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                          <div className="flex justify-center gap-1">
                            <EditForm formData={data} />
                            <DeleteItem _id={data._id} />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <SendData sendMail={handleSendEmail} loading={isSending} />
          </>
        ) : (
          <div className="h-[50vh] flex justify-center items-center">
            <CircularProgress />
          </div>
        )}
      </div>
    </>
  );
};

export default Table;
