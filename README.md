This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contratos Inteligentes utilizados y desplegeados en tesnet.

``
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificationAttestationService {
struct Certification {
bytes32 certificationHash; // Hash de la certificación
uint256 dateIssued; // Fecha en la que fue emitida la certificación
}

    // Mapeo de destinatario a lista de sus certificaciones
    mapping(address => Certification[]) public certificationsByRecipient;

    event CertificationIssued(address indexed recipient, bytes32 certificationHash, uint256 dateIssued);

    // Función para emitir una certificación y asociarla con el destinatario
    function issueCertification(address recipient, bytes32 certificationHash) public {
        Certification memory newCertification = Certification({
            certificationHash: certificationHash,
            dateIssued: block.timestamp
        });

        certificationsByRecipient[recipient].push(newCertification);
        emit CertificationIssued(recipient, certificationHash, block.timestamp);
    }

    // Función para obtener las certificaciones de un destinatario específico
    function getCertificationsOf(address recipient) public view returns (Certification[] memory) {
        return certificationsByRecipient[recipient];
    }

}

`

`
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CandidateRanking {
struct Candidate {
address candidateAddress;
uint256 score;
}

    mapping(address => Candidate) public candidates;
    mapping(address => bool) public authorizedEntities;

    event ScoreUpdated(address indexed candidateAddress, uint256 newScore);

    modifier onlyAuthorized() {
        require(authorizedEntities[msg.sender], "Not authorized");
        _;
    }

    constructor() {
        authorizedEntities[msg.sender] = true; // Contract deployer is authorized by default
    }

    function authorizeEntity(address entity) public onlyAuthorized {
        authorizedEntities[entity] = true;
    }

    function deauthorizeEntity(address entity) public onlyAuthorized {
        authorizedEntities[entity] = false;
    }

    function updateScore(address candidateAddress, uint256 newScore) public onlyAuthorized {
        candidates[candidateAddress].score = newScore;
        emit ScoreUpdated(candidateAddress, newScore);
    }

    function getCandidate(address candidateAddress) public view returns (Candidate memory) {
        return candidates[candidateAddress];
    }

}

`
