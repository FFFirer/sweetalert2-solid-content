
import { JSXElement } from 'solid-js';
import type { SweetAlertIcon, SweetAlertOptions, SweetAlertResult } from 'sweetalert2'

export type SweetAlert2 = any;
export type ParamsType = { [key: string]: any };

type JSXElementOr<K extends keyof SweetAlertOptions> = SweetAlertOptions[K] | JSXElement

interface SolidOptions {
    title?: JSXElementOr<'title'>
    html?: JSXElementOr<'html'>
    confirmButtonText?: JSXElementOr<'confirmButtonText'>
    denyButtonText?: JSXElementOr<'denyButtonText'>
    cancelButtonText?: JSXElementOr<'cancelButtonText'>
    footer?: JSXElementOr<'footer'>
    closeButtonHtml?: JSXElementOr<'closeButtonHtml'>
    iconHtml?: JSXElementOr<'iconHtml'>
    loaderHtml?: JSXElementOr<'loaderHtml'>
}

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U

export type SolidSweetAlertOptions = Overwrite<SweetAlertOptions, SolidOptions>
/**
 * Mimics SweetAlert2's call signatures, adding React elements as valid inputs.
 */
export interface SolidSweetAlert {
    (title?: JSXElement | string, message?: JSXElement | string, icon?: SweetAlertIcon): Promise<SweetAlertResult>

    (options: SolidSweetAlertOptions): Promise<SweetAlertResult>

    fire(title?: JSXElement | string, message?: JSXElement | string, icon?: SweetAlertIcon): Promise<SweetAlertResult>

    fire(options: SolidSweetAlertOptions): Promise<SweetAlertResult>

    mixin(options: SolidSweetAlertOptions): SweetAlert2 & SolidSweetAlert
}
