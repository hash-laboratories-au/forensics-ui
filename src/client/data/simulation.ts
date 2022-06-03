/* eslint-disable no-mixed-spaces-and-tabs */
import { v4 as uuidv4 } from 'uuid';

export const rawData = [
  {
    "DivergingHash": "0x11111111111111",
  	"AcrossEpochs":  true,
  	"SmallerRoundInfo": {
  			"HashPath": ["0x1, 0x2, 0x3"],
  			"QuorumCert": {
  			  "ProposedBlockInfo": {
  			    "Hash": "0x123",
  			    "Round": 10,
  			    "Number": 123123123
  			  },
  			  "Signatures": ["signatures-1", "signatures-2", "signatures-3"],
  			  "GapNumber": 450
  			},
  			"SignerAddresses": ["signer-1", "signer-2", "signer-3"]
  		},
  	"LargerRoundInfo": {
      "HashPath": ["0x1, 0xb, 0xc, 0xd"],
      "QuorumCert": {
        "ProposedBlockInfo": {
          "Hash": "0x123123",
          "Round": 11,
          "Number": 123123124
        },
        "Signatures": ["signatures-1", "signatures-2", "signatures-3", "signatures-4"],
        "GapNumber": 450
      },
      "SignerAddresses": ["signer-1", "signer-2", "signer-3", "signer-4"]
  		}
  },
  {
    "DivergingHash": "0x22222222222",
  	"AcrossEpochs":  false,
  	"SmallerRoundInfo": {
  			"HashPath": ["0x1, 0x2, 0x3"],
  			"QuorumCert": {
  			  "ProposedBlockInfo": {
  			    "Hash": "0x123",
  			    "Round": 10,
  			    "Number": 422323423
  			  },
  			  "Signatures": ["signatures-1", "signatures-2", "signatures-3"],
  			  "GapNumber": 450
  			},
  			"SignerAddresses": ["signer-1", "signer-2", "signer-3"]
  		},
  	"LargerRoundInfo": {
      "HashPath": ["0x1, 0xb, 0xc, 0xd"],
      "QuorumCert": {
        "ProposedBlockInfo": {
          "Hash": "0x123123",
          "Round": 11,
          "Number": 485343548
        },
        "Signatures": ["signatures-1", "signatures-2", "signatures-3", "signatures-4"],
        "GapNumber": 450
      },
      "SignerAddresses": ["signer-1", "signer-2", "signer-3", "signer-4"]
  		}
  }
];
function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toDateString();
}


const generateFakeForensicsReports = (numberOfFakeReports: number) =>{
  const reports = [];
  
  for (let index = 0; index < numberOfFakeReports; index++) {
    reports.push({
      key: uuidv4(),
      timestamp: randomDate(new Date(2020, 0, 1), new Date()),
      divergingBlockNumber: Math.floor(Math.random() *1000000),
      divergingBlockHash: `0x${uuidv4()}`,
      numberOfAttackerNodes: Math.floor(Math.random() *100),
      numberOfSuspeciousNodes: Math.floor(Math.random() *10)
    });
  }
  return reports;
};


export const loadInitialReports = generateFakeForensicsReports(20);