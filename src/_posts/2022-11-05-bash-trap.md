---
layout: post
title:  "TIL: cleanup temp files in shell commands w/ `trap`"
date:   2022-11-05 16:53:00 CES
description: "Be a good boyscout and clean up after yourself!"
---

_Be a good boyscout and clean up after yourself!_

After running a shell script you should clean temp files, this can be done through the `trap` command:


```shell
temp_file=$(mktemp)
trap "rm -f $temp_file" 0 2 3 15
....

rm ${temp_file}
```

See: <https://www.linuxjournal.com/content/bash-trap-command>
