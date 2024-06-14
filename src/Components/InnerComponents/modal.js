import Swal from "sweetalert2";
export const message = (type, title, text) => {
  Swal.fire({
    icon: type,
    title: title,
    text: text,
    position: "center",
    width: 600,
    background: "#15131D",
    color: "#FAFAFE",
    confirmButtonColor: "#312E3F",
    showConfirmButton: true,
    confirmButtonText: "Ok",
  });
};
