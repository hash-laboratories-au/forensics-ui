import * as React from "react";
import CardStats from "./Cards/CardStats";
import { WarningOutlined, GlobalOutlined, SyncOutlined, LoadingOutlined} from '@ant-design/icons';
import { Typography, Popover } from "antd";
import { getLatestSummary } from "../client/forensicsServer";

interface LatestSummary {
  latestBlock?: {
    hash: string,
    number: string,
  };
  latestCommittedBlock?: {
    hash: string,
    number: string,
  };
  numberOfAttackEvents?: string;
  numberOfAttackers?: string;
}

const getShortHash = (hash?: string) => {
  if (!hash) return '';
  const firstFour = hash.substring(0,4);
  const lastFour = hash.substring(hash.length-5,hash.length-1);
  return firstFour+'xxx'+lastFour;
};

const HeaderStats = () =>{
  const warningIcon = <WarningOutlined />;
  const globalIcon = <GlobalOutlined />;
  const syncOutlinedIcon = <SyncOutlined spin/>;
  const loadingOutlinedIcon= <LoadingOutlined spin/>;
  
  const [latestSummary, setLatestSummary] = React.useState<LatestSummary>({});

  const periodicallyGetAndSetSummary = async () => {
    const summary = await getLatestSummary();
    if (summary) {
      setLatestSummary(summary);
    }
    const id = setInterval(async () => {
      const summary = await getLatestSummary();
      if (summary) {
        setLatestSummary(summary);
      }
    }, 5000);
    return id;
  };
  
  React.useEffect(()=> {
    periodicallyGetAndSetSummary();
  },[]);
  return (
    <>
      {/* Header */}
    <div className="relative bg-sky-600 md:pt-32 pb-32 pt-12">
      <div className="px-4 md:px-10 mx-auto w-full ">
        <div>
          {/* Card stats */}
          <div className="flex flex-wrap">
            <Popover content={latestSummary?.latestBlock?.hash} title='Full hash'>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    statSubtitle="Latest Block"
                    statTitle={latestSummary?.latestBlock?.number || ''}
                    statDescripiron={getShortHash(latestSummary?.latestBlock?.hash)}
                    statIconColor="bg-green-500"
                    icon={loadingOutlinedIcon}
                  />    
              </div>
            </Popover>
            <Popover content={latestSummary?.latestCommittedBlock?.hash} title='Full hash'>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Latest Committed block"
                  statTitle={latestSummary?.latestCommittedBlock?.number || ''}
                  statDescripiron={getShortHash(latestSummary?.latestCommittedBlock?.hash)}
                  statIconColor="bg-blue-500"
                  icon={syncOutlinedIcon}
                />
              </div>
            </Popover>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <CardStats
                statSubtitle="Num. Attack events"
                statTitle={latestSummary?.numberOfAttackEvents || ''}
                statDescripiron="Last 24h"
                statIconColor="bg-red-500"
                icon={warningIcon}
              />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <CardStats
                statSubtitle="Num. Attacker"
                statTitle={latestSummary?.numberOfAttackers || ''}
                statDescripiron="Last 24h"
                statIconColor="bg-orange-500"
                icon={globalIcon}
              />
            </div>
          </div>
          <div className="mt-10 grid justify-items-center">
            <Typography.Title level={1} >
              XDC Forensics Monitoring
            </Typography.Title>
          </div>
        </div>
      </div>
      
    </div>
  </>
  );
};

export default HeaderStats;