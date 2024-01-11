import Swal from "sweetalert2";
export const message = (type, title, text) => {
    Swal.fire({
      icon: type,
      title: title,
      text: text,
      position: "center",
      width: 600,
      background: "#1F2937",
      color: "#FFFFF2",
      confirmButtonColor: "#111827",
      showConfirmButton: true,
      confirmButtonText: "Ok"
    });
  };
