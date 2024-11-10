import Swal from "sweetalert2";

interface MessageProps {
  type: 'success' | 'error' | 'warning' | 'info' | 'question';
  title?: string;
  text?: string;
}

export const message = ({ type, title, text }: MessageProps): void => {
  Swal.fire({
    icon: type,
    title,
    text,
    position: "center",
    width: 600,
    background: "#15131D",
    color: "#FAFAFE",
    confirmButtonColor: "#312E3F",
    showConfirmButton: true,
    confirmButtonText: "Ok",
  });
};
