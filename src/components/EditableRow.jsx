import React from "react";
import { Icon } from "@iconify/react";

export default function EditableRow({
  index,
  editFormData,
  handleEditFormChange,
  handleCAncelEditClick,
}) {
  return (
    <tr>
      <td className="flex justify-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {index + 1}
      </td>
      <td>
        <input
          type="text"
          name="studentid"
          value={editFormData.studentid}
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="กรอกรหัสนิสิต"
          id="inputSubject"
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="studentname"
          value={editFormData.studentname}
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="กรอกชื่อ-นามสกุล"
          id="inputSubject"
          onChange={handleEditFormChange}
        />
      </td>

      <td>
        <input
          type="number"
          name="studentscore"
          min={0}
          max={100}
          value={editFormData.studentscore}
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="100"
          id="inputSubject"
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <div className="flex gap-5 justify-center">
          <button
            type="submit"
            class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          >
            บันทึก
          </button>
          <button
            class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            onClick={handleCAncelEditClick}
          >
            ยกเลิก
          </button>
        </div>
      </td>
    </tr>
  );
}
