import { useTranslation } from "next-i18next";

import Container from "components/services/widget/container";
import Block from "components/services/widget/block";
import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
  const { t } = useTranslation();
  const { widget } = service;

  const { data: nodeData, error: nodeError } = useWidgetAPI(widget, "node");

  if (nodeError) {
    return <Container service={service} error={nodeError} />;
  }

  if (!nodeData) {
    return (
      <Container service={service}>
        <Block label="headscale.name" />
        <Block label="headscale.address" />
        <Block label="headscale.last_seen" />
        <Block label="headscale.status" />
      </Container>
    );
  }

  const { nodes } = widget;

  // default is "all"
  let filteredNodes = nodeData.nodes;
  if( nodes === "online" ){
    filteredNodes = filteredNodes.filter(n=>n.online);
  }
  else if ( nodes === "offline" ) {
    filteredNodes = filteredNodes.filter(n=>!n.online);
  }
  else if ( Array.isArray(nodes) ){
    filteredNodes = filteredNodes.filter(n=>nodes.includes(n.id)||nodes.some(node=>n.forcedTags.includes(node)||n.validTags.includes(node)));
  }

  filteredNodes.sort((a,b)=>(b.online - a.online) || (a.online ? a.givenName - b.givenName : new Date(a.lastSeen) - new Date(b.lastSeen)));

  if(filteredNodes.length === 1){
    const node = filteredNodes[0];
    return (
      <Container service={service}>
        <Block label="headscale.name" value={node.givenName || node.name} />
        <Block label="headscale.address" value={node.ipAddresses[0]}/>
        <Block label={node.online ? "headscale.status" : "headscale.last_seen"} value={node.online ? t("headscale.online") : t("common.relativeDate", {value: node.lastSeen})}/>
      </Container>
    );
  }

  return (
    <Container service={service}>
      <div class="w-full">
      {filteredNodes.map((node)=> (
        <Block key={node.id} label="" value={node.givenName || node.name} />
      ))}
      </div>
      <div class="w-full">
      {filteredNodes.map((node)=> (
        <Block key={node.id} label="" value={node.ipAddresses[0]}/>
      ))}
      </div>
      <div class="w-full">
      {filteredNodes.map((node)=> (
        <Block key={node.id} label="" value={node.online ? t("headscale.online") : t("common.relativeDate", {value: node.lastSeen})}/>
      ))}
      </div>
    </Container>
  );
}
