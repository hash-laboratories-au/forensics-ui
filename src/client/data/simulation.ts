/* eslint-disable no-mixed-spaces-and-tabs */
import { v4 as uuidv4 } from 'uuid';
import { ForensicsEventType } from '../forensicsServer';


export const fakeNodeInfo = {
  "_id": "61b445c157e3dc5f84283eb7",
  "candidate": "xdc374b7cc91c918c32a1149bd73b9527076e86bba4",
  "smartContractAddress": "0x0000000000000000000000000000000000000088",
  "__v": 0,
  "capacity": "1e+25",
  "capacityNumber": 10000000,
  "createdAt": "2021-12-11T06:31:29.276Z",
  "nodeId": "374b7cc91c918c32a1149bd73b9527076e86bba4",
  "owner": "xdc065551f0dcac6f00cae11192d462db709be3758c",
  "status": "MASTERNODE",
  "updatedAt": "2022-06-13T01:21:20.480Z",
  "latestSignedBlock": 33670860,
  "rank": 1,
  "dataCenter": {
      "location": "Africa",
      "name": "IndSoft"
  },
  "hardware": "128 GB Ram, 1 TB SSD, 48 vCPU",
  "name": "Africa",
  "socials": {
      "telegram": "https://t.me/xinfintalk",
      "website": "https://apothem.network"
  },
  "isMasternode": true,
  "isPenalty": false,
  "slashedTimes": 0
}

export const detailedForensicsReport = {
  "id": uuidv4(),
  "DivergingHash": "0x11111111111111",
	"AcrossEpochs":  true,
	suspeciousNodes: ["xdc123123123123", "xdc19999999999999", "xdc888888888888888"],
	divergingPathsMap: {
	  'name': '0x111111111',
	  children: [
  	  {
  	    'name': '0x222222222',
  	     children: [
  	       {
  	         'name': '0x333333333'
  	       }
  	     ]
  	  },
  	  {
        'name': '0xbbbbbbbbb',
        children: [
          {
            'name': '0xcccccccccccc',
            children: [
              {
                'name': '0xdddddddddd', 
              }
            ] 
          }
        ]
     }
	  ]
	},
	eventTime: (new Date()).toTimeString(),
	daysSinceLastEvent: '5 days',
	eventType: 'ATTACK' as ForensicsEventType,
	"FORK_1": {
	  hash: "0x123",
		round: '10',
		number: '123123123',
		signersAddress: ["signer-1", "signer-2", "signer-3", "signer-5"]
	},
	"FORK_2": {
    hash: "0x123123",
    round: '11',
    number: '123123124',
    signersAddress: ["signer-1", "signer-2", "signer-3", "signer-4"]
	}
};

function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


const generateFakeForensicsReports = (numberOfFakeReports: number) =>{
  const reports = [];
  
  for (let index = 0; index < numberOfFakeReports; index++) {
    reports.push({
      key: uuidv4(),
      timestamp: randomDate(new Date(2020, 0, 1), new Date()),
      divergingBlockNumber: Math.floor(Math.random() *1000000),
      divergingBlockHash: `0x${uuidv4()}`,
      numberOfSuspeciousNodes: Math.floor(Math.random() *10)
    });
  }
  
  
  reports.sort((a, b) => {
    return b.timestamp.getMilliseconds()-a.timestamp.getMilliseconds();
  });
  
  return reports;
};


export const loadInitialReports_last7days = generateFakeForensicsReports(2);
export const loadInitialReports_last30days = generateFakeForensicsReports(5);
export const loadInitialReports = generateFakeForensicsReports(20);

export const loadRealtimeNewReports = () => {
  // 1/5 ratio to load a new report
  const numberOfReports = Math.random()*100<20 ? 1:0;
  return generateFakeForensicsReports(numberOfReports);
};

let latestBlockNumber = Math.floor(Math.random() *1000000);
let committedBlockNumber = latestBlockNumber -3;
export const latestSummary = () => {
  const blocks = {
    latestBlock: {
      hash: `0x${uuidv4()}`,
      number: latestBlockNumber.toString()
    },
    latestCommittedBlock: {
      hash: `0x${uuidv4()}`,
      number: committedBlockNumber.toString()
    },
    numberOfAttackEvents: '2',
    numberOfAttackers: '5'
  };
  
  latestBlockNumber++;
  committedBlockNumber = latestBlockNumber -3;
  return blocks;
};