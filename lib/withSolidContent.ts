import { render } from "solid-js/web";
import { mounts } from "./mounts";
import { ParamsType, SolidSweetAlert, SweetAlert2 } from "./types";
import { SweetAlertIcon, SweetAlertOptions, SweetAlertResult } from "sweetalert2";

const noop = () => { }; // eslint-disable-line @typescript-eslint/no-empty-function

interface __Inner {
    // (title?: Element | string, message?: Element | string, icon?: SweetAlertIcon): Promise<SweetAlertResult>

    // (options: SweetAlertOptions): Promise<SweetAlertResult>

    // fire(title?: Element | string, message?: Element | string, icon?: SweetAlertIcon): Promise<SweetAlertResult>

    // fire(options: SweetAlertOptions): Promise<SweetAlertResult>

    // mixin(options: SweetAlertOptions): SweetAlert2 & SolidSweetAlert

    __roots: any[],
    __params: any[]
}

const withSolidContent = (ParentSwal: SweetAlert2 & any): SweetAlert2 & SolidSweetAlert => {
    function extractSolidParams(params: any) {
        const solidParams: ParamsType = {};
        const otherParams: ParamsType = {};

        const mountKeys = mounts.map((mount) => mount.key);

        Object.entries(params).forEach(([key, value]) => {
            if (mountKeys.includes(key)) {
                solidParams[key] = typeof value === "function" ? value : () => value;
                otherParams[key] = " ";
            } else {
                otherParams[key] = value;
            }
        });
        return [solidParams, otherParams];
    }

    function render2(swal: any, solidParams: ParamsType) {
        Object.entries(solidParams).forEach(([key, value]) => {
            const mount = mounts.find((mount) => mount.key === key);
            const domElement = mount!.getter(ParentSwal);

            // const root = createRoot(domElement);
            // (root as any).render(value);

            const disposeRoot = render(value as any, domElement);

            (swal as any).__roots.push(disposeRoot);
        });
    }

    function unrender(swal: any) {
        (swal as any).__roots.forEach((root: any) => {
            root?.();
        });
        (swal as any).__roots = [];
    }

    return class extends ParentSwal {
        _main(params: ParamsType, mixinParams: ParamsType) {
            this.__roots = [];
            this.__params = Object.assign({}, mixinParams, params);
            const [reactParams, otherParams] = extractSolidParams(this.__params);
            const superWillOpen = otherParams.willOpen || noop;
            const superDidOpen = otherParams.didOpen || noop;
            const superDidDestroy = otherParams.didDestroy || noop;
            return super._main(
                Object.assign({}, otherParams, {
                    willOpen: (popup: any) => {
                        render2(this, reactParams);
                        superWillOpen(popup);
                    },
                    didOpen: (popup: any) => {
                        // read more about why this setTimeout is needed here:
                        // https://github.com/reactwg/react-18/discussions/5 (What about the render callback?)
                        setTimeout(() => {
                            superDidOpen(popup);
                        });
                    },
                    didDestroy: (popup: any) => {
                        superDidDestroy(popup);
                        unrender(this);
                    },
                })
            );
        }

        update(params: ParamsType) {
            Object.assign(this.__params, params);
            unrender(this);
            const [solidParams, otherParams] = extractSolidParams(this.__params);
            super.update(otherParams);
            render2(this, solidParams);
        }
    } as any;
};

export default withSolidContent;
