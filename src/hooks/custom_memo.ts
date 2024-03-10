type MemoizationData = {
    deps: any[];
    callback: any;
    result: any;
};

const data: MemoizationData[] = [];

export default function memoize(callback: any, deps: any[]) {
    const memo = data.find((memo) => {
        if (memo.deps.length !== deps.length) {
            return false;
        }

        for (let i = 0; i < memo.deps.length; i++) {
            if (memo.deps[i] !== deps[i]) {
                return false;
            }
        }

        return true;
    });

    if (memo) {
        return memo.result;
    }

    const result = callback();

    data.push({
        deps,
        callback,
        result,
    });

    return result;
}
