import React from "react";
import { Icon } from "@iconify/react";

const ReadOnlyRow = ({ info, index, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td className="flex justify-center text-m text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {index + 1}
      </td>
      <td className="text-center text-m text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {info.studentid}
      </td>
      <td className="text-m text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {info.studentname}
      </td>
      <td className="text-center text-m text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {info.studentscore}
      </td>
      <td>
        <div className="flex gap-5 justify-center">
          <Icon
            icon="mdi:pencil"
            style={{ fontSize: "22px" }}
            onClick={(e) => handleEditClick(e, info)}
          />
          <Icon
            icon="mdi:delete-outline"
            style={{ fontSize: "22px", color: "red" }}
            onClick={(e) => handleDeleteClick(e, info)}
          />
        </div>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
