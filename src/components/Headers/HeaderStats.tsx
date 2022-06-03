import * as React from "react";
import CardStats from "../Cards/CardStats";
import { WarningOutlined, GlobalOutlined, SyncOutlined, LoadingOutlined} from '@ant-design/icons';

export default class HeaderStats extends React.Component {
  
  render(){
    const warningIcon = <WarningOutlined />;
    const globalIcon = <GlobalOutlined />;
    const syncOutlinedIcon = <SyncOutlined spin/>;
    const loadingOutlinedIcon= <LoadingOutlined spin/>;
    
    return (
      <>
        {/* Header */}
      <div className="relative bg-sky-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Latest Block"
                  statTitle="350,897"
                  statPercentColor="text-emerald-500"
                  statDescripiron="0x1234...6789"
                  statIconColor="bg-green-500"
                  icon={loadingOutlinedIcon}
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Latest Committed block"
                  statTitle="350,893"
                  statArrow="down"
                  statPercentColor="text-red-500"
                  statDescripiron="0x1234...6789"
                  statIconColor="bg-blue-500"
                  icon={syncOutlinedIcon}
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Num. Attack events"
                  statTitle="2"
                  statArrow="down"
                  statPercentColor="text-orange-500"
                  statDescripiron="Last 24h"
                  statIconColor="bg-red-500"
                  icon={warningIcon}
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Num. Attacker"
                  statTitle="5"
                  statArrow="up"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Last 24h"
                  statIconColor="bg-orange-500"
                  icon={globalIcon}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    );
  }
}
