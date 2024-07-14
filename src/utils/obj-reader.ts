

export default function (config: any) {

    return function (strPath?: string) {
        
        function nested(current: number, config: any) {
            if (current < levels.length)
                return nested(current + 1, config[levels[current]]);
            else
                return config;
        }

        if (!strPath) return config;
        const levels = strPath.split(".");
        return nested(0, config);
    };
}