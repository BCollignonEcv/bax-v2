const enableLogs = import.meta.env.VITE_APP_ENABLE_LOGS === 'true';

export const writeLog = (message, level = 'LOG') => {

    if (enableLogs) {
        switch (level) {
            case ('INFO'):
                console.log(`%c ${message}`, 'background: yellow; color: black; padding: 5px')
                break;

            case ('SUCCESS'):
                console.log(`%c ${message}`, 'background: green; color: white; padding: 5px')
                break;

            case ('ERROR'):
                console.log(`%c ${message}`, 'background: red; color: white; padding: 5px')
                break;

            case ('LOG'):
                console.log(`%c ${message}`, 'background: white; color: black; padding: 5px')
                break;

            default:
                console.log(`%c ${message}`, 'background: white; color: black; padding: 5px')
                break;
        }
    }
}