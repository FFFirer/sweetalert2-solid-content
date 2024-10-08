import { SweetAlert2 } from "./types";

export const mounts = [
    {
      key: "title",
      getter: (swal: SweetAlert2) => swal.getTitle(),
    },
    {
      key: "html",
      getter: (swal: SweetAlert2) => swal.getHtmlContainer(),
    },
    {
      key: "confirmButtonText",
      getter: (swal: SweetAlert2) => swal.getConfirmButton(),
    },
    {
      key: "denyButtonText",
      getter: (swal: SweetAlert2) => swal.getDenyButton(),
    },
    {
      key: "cancelButtonText",
      getter: (swal: SweetAlert2) => swal.getCancelButton(),
    },
    {
      key: "footer",
      getter: (swal: SweetAlert2) => swal.getFooter(),
    },
    {
      key: "closeButtonHtml",
      getter: (swal: SweetAlert2) => swal.getCloseButton(),
    },
    {
      key: "iconHtml",
      getter: (swal: SweetAlert2) => swal.getIconContent(),
    },
    {
      key: "loaderHtml",
      getter: (swal: any) => swal.getLoader(),
    },
  ];
