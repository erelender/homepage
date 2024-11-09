
---
title: Headscale
description: Headscale Widget Configuration
---

Learn more about [Headscale](https://headscale.net/).

You will need to generate an API access token from the [command line](https://headscale.net/ref/remote-cli/#create-an-api-key) using `heads>

The widget can be used in two distinct modes: single-node and multi-node. Nodes can be filtered using the `nodes` configuration property. 
Acceptable values for the nodes field are:

 - Omitted: All nodes will be listed
 - "online": Only online nodes will be listed
 - "offline": Only offline nodes will be listed
 - Array of nodeIds: Only nodes that match the ids in the array will be listed
 - Array of tags: Only nodes that carry any of the tags in the array will be listed.

To find your node ID, you can use `headscale nodes list` command.

Allowed fields: `["name", "address", "last_seen", "status"]`.

```yaml
widget:
  type: headscale
  nodes: "online"
  key: headscaleapiaccesstoken

widget:
  type: headscale
  nodes: ["1", "2"]
  key: headscaleapiaccesstoken

widget:
  type: headscale
  nodes: ["tag:servers", "tag:ephemeral"]
  key: headscaleapiaccesstoken
```

