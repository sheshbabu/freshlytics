import useragent from "useragent";

function getBrowserName(ua: string) {
  const agent = useragent.lookup(ua);
  return agent.family;
}

function getBrowserNameVersion(ua: string) {
  const agent = useragent.lookup(ua);
  return `${agent.family}-${agent.major}`;
}

export default {
  getBrowserName,
  getBrowserNameVersion
};
