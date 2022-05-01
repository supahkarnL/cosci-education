import React from "react";

import swal from "sweetalert2";

export default function CreatedataTest() {
  return (
    <div>
      <button
        onClick={() =>
          swal.fire({
            title: "SweetAlert2!",
            text: "นี่คือ SweetAlert2",
            icon: "success",
            confirmButtonText: "รับทราบ!",
          })
        }
      >
        กดปุ่มนี้สิ
      </button>
    </div>
  );
}
