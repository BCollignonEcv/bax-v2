const enableLogs = import.meta.env.VITE_APP_ENABLE_LOGS === 'true';

export const writeLog = (title, info, level = 'LOG') => {

    if (enableLogs) {
        let msg = info ? `${title} \n ${info}` : title;
        switch (level) {
            case ('INFO'):
                console.log(`%c ${msg}`, 'background: yellow; color: black; padding: 5px')
                break;

            case ('SUCCESS'):
                console.log(`%c ${msg}`, 'background: green; color: white; padding: 5px')
                break;

            case ('ERROR'):
                console.log(`%c ${msg}`, 'background: red; color: white; padding: 5px')
                break;

            case ('LOG'):
                console.log(`%c ${msg}`, 'background: white; color: black; padding: 5px')
                break;

            default:
                console.log(`%c ${msg}`, 'background: white; color: black; padding: 5px')
                break;
        }
    }
}