import { PLATFORM } from 'aurelia-framework';
export { UxTextareaTheme } from './ux-textarea-theme';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./ux-textarea')
    ]);
}
