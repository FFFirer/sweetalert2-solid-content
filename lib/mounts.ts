import { SwalType } from "./types";

export const mounts = [
    {
      key: "title",
      getter: (swal: SwalType) => swal.getTitle(),
    },
    {
      key: "html",
      getter: (swal: SwalType) => swal.getHtmlContainer(),
    },
    {
      key: "confirmButtonText",
      getter: (swal: SwalType) => swal.getConfirmButton(),
    },
    {
      key: "denyButtonText",
      getter: (swal: SwalType) => swal.getDenyButton(),
    },
    {
      key: "cancelButtonText",
      getter: (swal: SwalType) => swal.getCancelButton(),
    },
    {
      key: "footer",
      getter: (swal: SwalType) => swal.getFooter(),
    },
    {
      key: "closeButtonHtml",
      getter: (swal: SwalType) => swal.getCloseButton(),
    },
    {
      key: "iconHtml",
      getter: (swal: SwalType) => swal.getIconContent(),
    },
    {
      key: "loaderHtml",
      getter: (swal: SwalType) => swal.getLoader(),
    },
  ];
  