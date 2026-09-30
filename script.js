/* =========================================
   LETTER / NUMBER CONVERSION
========================================= */


/*
    A = 0
    B = 1
    C = 2
    ...
    Z = 25
*/

function letterToNumber(letter) {

    return letter
        .toUpperCase()
        .charCodeAt(0) - 65;

}


function numberToLetter(number) {

    return String.fromCharCode(
        number + 65
    );

}



/* =========================================
   INPUT VALIDATION
========================================= */


/*
    The key may only contain letters.
*/

function isValidKey(key) {

    return /^[A-Za-z]+$/.test(key);

}


/*
    Check whether a message contains
    at least one letter.
*/

function containsLetters(message) {

    return /[A-Za-z]/.test(message);

}



/* =========================================
   VIGENERE ENCRYPTION
========================================= */

function vigenereEncrypt(
    plaintext,
    key
) {

    plaintext =
        plaintext.toUpperCase();

    key =
        key.toUpperCase();


    let ciphertext = "";

    let keyIndex = 0;


    for (
        let i = 0;
        i < plaintext.length;
        i++
    ) {

        const character =
            plaintext[i];


        /*
            Encrypt alphabetic characters.

            Spaces and punctuation
            stay unchanged.
        */

        if (/[A-Z]/.test(character)) {

            const plaintextValue =
                letterToNumber(
                    character
                );


            const keyLetter =
                key[
                    keyIndex
                    %
                    key.length
                ];


            const keyValue =
                letterToNumber(
                    keyLetter
                );


            /*
                C = (P + K) mod 26
            */

            const encryptedValue =
                (
                    plaintextValue
                    +
                    keyValue
                )
                % 26;


            ciphertext +=
                numberToLetter(
                    encryptedValue
                );


            keyIndex++;

        }

        else {

            ciphertext +=
                character;

        }

    }


    return ciphertext;

}



/* =========================================
   VIGENERE DECRYPTION
========================================= */

function vigenereDecrypt(
    ciphertext,
    key
) {

    ciphertext =
        ciphertext.toUpperCase();

    key =
        key.toUpperCase();


    let plaintext = "";

    let keyIndex = 0;


    for (
        let i = 0;
        i < ciphertext.length;
        i++
    ) {

        const character =
            ciphertext[i];


        if (/[A-Z]/.test(character)) {

            const cipherValue =
                letterToNumber(
                    character
                );


            const keyLetter =
                key[
                    keyIndex
                    %
                    key.length
                ];


            const keyValue =
                letterToNumber(
                    keyLetter
                );


            /*
                P = (C - K + 26) mod 26
            */

            const decryptedValue =
                (
                    cipherValue
                    -
                    keyValue
                    +
                    26
                )
                % 26;


            plaintext +=
                numberToLetter(
                    decryptedValue
                );


            keyIndex++;

        }

        else {

            plaintext +=
                character;

        }

    }


    return plaintext;

}



/* =========================================
   MAIN ENCRYPTION
========================================= */

function encryptMessage() {

    const plaintext =
        document
            .getElementById(
                "plaintext"
            )
            .value
            .trim();


    const key =
        document
            .getElementById(
                "encryptKey"
            )
            .value
            .trim();


    const error =
        document
            .getElementById(
                "encryptError"
            );


    const output =
        document
            .getElementById(
                "ciphertextOutput"
            );


    const steps =
        document
            .getElementById(
                "encryptionSteps"
            );


    const reverseSection =
        document
            .getElementById(
                "encryptReverseSection"
            );



    /*
        Do not remove the user's
        plaintext or key.

        Only clear the previous result.
    */

    error.textContent = "";

    output.value = "";

    steps.innerHTML = "";

    reverseSection.style.display =
        "none";



    /* =====================================
       VALIDATION
    ====================================== */

    if (plaintext === "") {

        error.textContent =
            "❌ Error: Please enter plaintext.";

        return;

    }


    if (!containsLetters(plaintext)) {

        error.textContent =
            "❌ Error: Plaintext must contain letters.";

        return;

    }


    if (key === "") {

        error.textContent =
            "❌ Error: Please enter a key.";

        return;

    }


    if (!isValidKey(key)) {

        error.textContent =
            "❌ Error: Key must contain letters only.";

        return;

    }



    /* =====================================
       ENCRYPT
    ====================================== */

    const ciphertext =
        vigenereEncrypt(
            plaintext,
            key
        );


    output.value =
        ciphertext;



    /* =====================================
       DISPLAY STEPS
    ====================================== */

    displayEncryptionSteps(
        plaintext,
        key,
        steps
    );



    /*
        Show the Decrypt button.
    */

    reverseSection.style.display =
        "block";

}



/* =========================================
   MAIN DECRYPTION
========================================= */

function decryptMessage() {

    const ciphertext =
        document
            .getElementById(
                "ciphertext"
            )
            .value
            .trim();


    const key =
        document
            .getElementById(
                "decryptKey"
            )
            .value
            .trim();


    const error =
        document
            .getElementById(
                "decryptError"
            );


    const output =
        document
            .getElementById(
                "plaintextOutput"
            );


    const steps =
        document
            .getElementById(
                "decryptionSteps"
            );


    const reverseSection =
        document
            .getElementById(
                "decryptReverseSection"
            );



    /*
        Keep the ciphertext and key.

        Only clear previous output.
    */

    error.textContent = "";

    output.value = "";

    steps.innerHTML = "";

    reverseSection.style.display =
        "none";



    /* =====================================
       VALIDATION
    ====================================== */

    if (ciphertext === "") {

        error.textContent =
            "❌ Error: Please enter ciphertext.";

        return;

    }


    if (!containsLetters(ciphertext)) {

        error.textContent =
            "❌ Error: Ciphertext must contain letters.";

        return;

    }


    if (key === "") {

        error.textContent =
            "❌ Error: Please enter a key.";

        return;

    }


    if (!isValidKey(key)) {

        error.textContent =
            "❌ Error: Key must contain letters only.";

        return;

    }



    /* =====================================
       DECRYPT
    ====================================== */

    const plaintext =
        vigenereDecrypt(
            ciphertext,
            key
        );


    output.value =
        plaintext;



    /* =====================================
       DISPLAY STEPS
    ====================================== */

    displayDecryptionSteps(
        ciphertext,
        key,
        steps
    );



    /*
        Show Encrypt button.
    */

    reverseSection.style.display =
        "block";

}



/* =========================================
   SEND ENCRYPTION RESULT TO
   DECRYPTION CARD
========================================= */

function sendToDecryption() {

    const ciphertext =
        document
            .getElementById(
                "ciphertextOutput"
            )
            .value
            .trim();


    const key =
        document
            .getElementById(
                "encryptKey"
            )
            .value
            .trim();


    if (ciphertext === "") {

        return;

    }


    /*
        Copy ciphertext and key
        to the Decryption card.
    */

    document
        .getElementById(
            "ciphertext"
        )
        .value =
        ciphertext;


    document
        .getElementById(
            "decryptKey"
        )
        .value =
        key;


    /*
        Automatically decrypt.
    */

    decryptMessage();

}



/* =========================================
   SEND DECRYPTION RESULT TO
   ENCRYPTION CARD
========================================= */

function sendToEncryption() {

    const plaintext =
        document
            .getElementById(
                "plaintextOutput"
            )
            .value
            .trim();


    const key =
        document
            .getElementById(
                "decryptKey"
            )
            .value
            .trim();


    if (plaintext === "") {

        return;

    }


    /*
        Copy plaintext and key
        to Encryption card.
    */

    document
        .getElementById(
            "plaintext"
        )
        .value =
        plaintext;


    document
        .getElementById(
            "encryptKey"
        )
        .value =
        key;


    /*
        Automatically encrypt.
    */

    encryptMessage();

}



/* =========================================
   ENCRYPTION STEP VISUALIZATION
========================================= */

function displayEncryptionSteps(
    plaintext,
    key,
    container
) {

    plaintext =
        plaintext.toUpperCase();

    key =
        key.toUpperCase();


    let table = `

        <h3 class="step-title">
            Encryption Steps
        </h3>

        <table class="step-table">

            <tr>

                <th>
                    Letter
                </th>

                <th>
                    P
                </th>

                <th>
                    Key
                </th>

                <th>
                    K
                </th>

                <th>
                    Calculation
                </th>

                <th>
                    Result
                </th>

            </tr>

    `;


    let keyIndex = 0;


    for (
        let i = 0;
        i < plaintext.length;
        i++
    ) {

        const character =
            plaintext[i];


        if (
            !/[A-Z]/.test(
                character
            )
        ) {

            continue;

        }


        const p =
            letterToNumber(
                character
            );


        const keyLetter =
            key[
                keyIndex
                %
                key.length
            ];


        const k =
            letterToNumber(
                keyLetter
            );


        const result =
            (
                p
                +
                k
            )
            % 26;


        const resultLetter =
            numberToLetter(
                result
            );


        table += `

            <tr>

                <td>
                    ${character}
                </td>

                <td>
                    ${p}
                </td>

                <td>
                    ${keyLetter}
                </td>

                <td>
                    ${k}
                </td>

                <td>
                    (${p} + ${k}) mod 26 = ${result}
                </td>

                <td>
                    ${resultLetter}
                </td>

            </tr>

        `;


        keyIndex++;

    }


    table += `

        </table>

    `;


    container.innerHTML =
        table;

}



/* =========================================
   DECRYPTION STEP VISUALIZATION
========================================= */

function displayDecryptionSteps(
    ciphertext,
    key,
    container
) {

    ciphertext =
        ciphertext.toUpperCase();

    key =
        key.toUpperCase();


    let table = `

        <h3 class="step-title">
            Decryption Steps
        </h3>

        <table class="step-table">

            <tr>

                <th>
                    Letter
                </th>

                <th>
                    C
                </th>

                <th>
                    Key
                </th>

                <th>
                    K
                </th>

                <th>
                    Calculation
                </th>

                <th>
                    Result
                </th>

            </tr>

    `;


    let keyIndex = 0;


    for (
        let i = 0;
        i < ciphertext.length;
        i++
    ) {

        const character =
            ciphertext[i];


        if (
            !/[A-Z]/.test(
                character
            )
        ) {

            continue;

        }


        const c =
            letterToNumber(
                character
            );


        const keyLetter =
            key[
                keyIndex
                %
                key.length
            ];


        const k =
            letterToNumber(
                keyLetter
            );


        const result =
            (
                c
                -
                k
                +
                26
            )
            % 26;


        const resultLetter =
            numberToLetter(
                result
            );


        table += `

            <tr>

                <td>
                    ${character}
                </td>

                <td>
                    ${c}
                </td>

                <td>
                    ${keyLetter}
                </td>

                <td>
                    ${k}
                </td>

                <td>
                    (${c} - ${k} + 26)
                    mod 26 = ${result}
                </td>

                <td>
                    ${resultLetter}
                </td>

            </tr>

        `;


        keyIndex++;

    }


    table += `

        </table>

    `;


    container.innerHTML =
        table;

}



/* =========================================
   CLEAR ENCRYPTION
========================================= */

function clearEncryption() {

    document
        .getElementById(
            "plaintext"
        )
        .value = "";


    document
        .getElementById(
            "encryptKey"
        )
        .value = "";


    document
        .getElementById(
            "ciphertextOutput"
        )
        .value = "";


    document
        .getElementById(
            "encryptError"
        )
        .textContent = "";


    document
        .getElementById(
            "encryptionSteps"
        )
        .innerHTML = "";


    document
        .getElementById(
            "encryptReverseSection"
        )
        .style
        .display = "none";

}



/* =========================================
   CLEAR DECRYPTION
========================================= */

function clearDecryption() {

    document
        .getElementById(
            "ciphertext"
        )
        .value = "";


    document
        .getElementById(
            "decryptKey"
        )
        .value = "";


    document
        .getElementById(
            "plaintextOutput"
        )
        .value = "";


    document
        .getElementById(
            "decryptError"
        )
        .textContent = "";


    document
        .getElementById(
            "decryptionSteps"
        )
        .innerHTML = "";


    document
        .getElementById(
            "decryptReverseSection"
        )
        .style
        .display = "none";

}



/* =========================================
   TEST CASE DATA
========================================= */

const testCases = [

    {
        plaintext:
            "HELLO",

        key:
            "KEY",

        ciphertext:
            "RIJVS"
    },


    {
        plaintext:
            "COMPUTER",

        key:
            "ABC",

        ciphertext:
            "CPOPVVES"
    },


    {
        plaintext:
            "SECURITY",

        key:
            "LOCK",

        ciphertext:
            "DSEECWVI"
    }

];



/* =========================================
   ENCRYPTION TESTS
========================================= */

function runEncryptionTests() {

    const container =
        document
            .getElementById(
                "encryptionTests"
            );


    container.innerHTML = "";


    testCases.forEach(
        function(
            test,
            index
        ) {

            const programOutput =
                vigenereEncrypt(
                    test.plaintext,
                    test.key
                );


            const passed =
                programOutput
                ===
                test.ciphertext;


            container.innerHTML += `

                <div class="test-case">

                    <div class="test-case-title">

                        TEST CASE ${index + 1}

                    </div>


                    <div class="test-content">

                        <p>
                            Plaintext:
                            ${test.plaintext}
                        </p>

                        <p>
                            Key:
                            ${test.key}
                        </p>

                        <p>
                            Expected Ciphertext:
                            ${test.ciphertext}
                        </p>

                        <p>
                            Program Output:
                            ${programOutput}
                        </p>

                        <p
                            class="${
                                passed
                                    ? "pass"
                                    : "fail"
                            }"
                        >

                            Result:

                            ${
                                passed
                                    ? "PASS ✓"
                                    : "FAIL ✗"
                            }

                        </p>

                    </div>

                </div>

            `;

        }
    );

}



/* =========================================
   DECRYPTION TESTS
========================================= */

function runDecryptionTests() {

    const container =
        document
            .getElementById(
                "decryptionTests"
            );


    container.innerHTML = "";


    testCases.forEach(
        function(
            test,
            index
        ) {

            const programOutput =
                vigenereDecrypt(
                    test.ciphertext,
                    test.key
                );


            const passed =
                programOutput
                ===
                test.plaintext;


            container.innerHTML += `

                <div class="test-case">

                    <div class="test-case-title">

                        TEST CASE ${index + 1}

                    </div>


                    <div class="test-content">

                        <p>
                            Ciphertext:
                            ${test.ciphertext}
                        </p>

                        <p>
                            Key:
                            ${test.key}
                        </p>

                        <p>
                            Expected Plaintext:
                            ${test.plaintext}
                        </p>

                        <p>
                            Program Output:
                            ${programOutput}
                        </p>

                        <p
                            class="${
                                passed
                                    ? "pass"
                                    : "fail"
                            }"
                        >

                            Result:

                            ${
                                passed
                                    ? "PASS ✓"
                                    : "FAIL ✗"
                            }

                        </p>

                    </div>

                </div>

            `;

        }
    );

}



/* =========================================
   KEY REUSE DEMONSTRATION
========================================= */

function demonstrateKeyReuse() {

    const message1 =
        document
            .getElementById(
                "message1"
            )
            .value
            .trim();


    const message2 =
        document
            .getElementById(
                "message2"
            )
            .value
            .trim();


    const key =
        document
            .getElementById(
                "reuseKey"
            )
            .value
            .trim();


    const error =
        document
            .getElementById(
                "reuseError"
            );


    const cipher1Output =
        document
            .getElementById(
                "reuseCipher1"
            );


    const cipher2Output =
        document
            .getElementById(
                "reuseCipher2"
            );


    const explanation =
        document
            .getElementById(
                "reuseExplanation"
            );



    error.textContent = "";

    cipher1Output.value = "";

    cipher2Output.value = "";

    explanation.innerHTML = "";



    /* =====================================
       VALIDATION
    ====================================== */

    if (
        message1 === ""
        ||
        message2 === ""
    ) {

        error.textContent =
            "❌ Error: Please enter both messages.";

        return;

    }


    if (
        !containsLetters(message1)
        ||
        !containsLetters(message2)
    ) {

        error.textContent =
            "❌ Error: Messages must contain letters.";

        return;

    }


    if (key === "") {

        error.textContent =
            "❌ Error: Please enter a key.";

        return;

    }


    if (!isValidKey(key)) {

        error.textContent =
            "❌ Error: Key must contain letters only.";

        return;

    }



    /* =====================================
       ENCRYPT BOTH WITH SAME KEY
    ====================================== */

    const ciphertext1 =
        vigenereEncrypt(
            message1,
            key
        );


    const ciphertext2 =
        vigenereEncrypt(
            message2,
            key
        );


    cipher1Output.value =
        ciphertext1;


    cipher2Output.value =
        ciphertext2;



    /* =====================================
       REPEATED KEY
    ====================================== */

    const repeatedKey1 =
        buildRepeatedKey(
            message1,
            key
        );


    const repeatedKey2 =
        buildRepeatedKey(
            message2,
            key
        );



    explanation.innerHTML = `

        <strong>
            Repeated Key for Message 1:
        </strong>

        <br>

        ${repeatedKey1}


        <br><br>


        <strong>
            Repeated Key for Message 2:
        </strong>

        <br>

        ${repeatedKey2}


        <br><br>


        <strong>
            What does this demonstrate?
        </strong>

        <br>

        Both messages were encrypted using
        the same key.

        Since the Vigenère Cipher repeats
        the key, the same key letters are
        reused at the same positions.

        If several ciphertexts use the same
        key, repeated patterns and
        relationships may become easier
        to analyze.

        Therefore, repeatedly reusing the
        same Vigenère key weakens the
        security of the cipher.

    `;

}



/* =========================================
   CLEAR SECURITY DEMONSTRATION
========================================= */

function clearKeyReuse() {

    document
        .getElementById(
            "message1"
        )
        .value = "";


    document
        .getElementById(
            "message2"
        )
        .value = "";


    document
        .getElementById(
            "reuseKey"
        )
        .value = "";


    document
        .getElementById(
            "reuseCipher1"
        )
        .value = "";


    document
        .getElementById(
            "reuseCipher2"
        )
        .value = "";


    document
        .getElementById(
            "reuseError"
        )
        .textContent = "";


    document
        .getElementById(
            "reuseExplanation"
        )
        .innerHTML = "";

}



/* =========================================
   BUILD REPEATED KEY
========================================= */

function buildRepeatedKey(
    message,
    key
) {

    message =
        message.toUpperCase();

    key =
        key.toUpperCase();


    let repeatedKey = "";

    let keyIndex = 0;


    for (
        let i = 0;
        i < message.length;
        i++
    ) {

        if (
            /[A-Z]/.test(
                message[i]
            )
        ) {

            repeatedKey +=
                key[
                    keyIndex
                    %
                    key.length
                ];


            keyIndex++;

        }

        else {

            repeatedKey +=
                message[i];

        }

    }


    return repeatedKey;

}



/* =========================================
   PAGE LOAD
========================================= */

window.onload =
    function() {


        /*
            Hide reverse buttons initially.
        */

        document
            .getElementById(
                "encryptReverseSection"
            )
            .style
            .display = "none";


        document
            .getElementById(
                "decryptReverseSection"
            )
            .style
            .display = "none";



        /*
            Automatically show test cases.
        */

        runEncryptionTests();

        runDecryptionTests();

    };
