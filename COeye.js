// EYE – Multi-Master / Multi-Slave Evaluator
// Konsequenz von AGE + PAIRING + NC

import { AGE } from "./AGE.js";
import { NC_CHECK } from "./NCCheck.js";

export function EYE(respoList) {

    const results = [];

    for (let i = 0; i < respoList.length; i++) {
        const A = respoList[i];

        const ncA = NC_CHECK(A.sync);

        const pairs = [];

        for (let j = 0; j < respoList.length; j++) {
            if (i === j) continue;

            const B = respoList[j];
            const eval = AGE(A, B);

            pairs.push({
                target: B.core?.name || "unknown",
                compatible: eval.compatible,
                reason: eval.reason,
                axis: eval.axis,
                structure: eval.structure,
                motion: eval.motion,
                capital: eval.capital
            });
        }

        results.push({
            name: A.core?.name || "unknown",
            nc: ncA,
            pairs
        });
    }

    return results;
}
