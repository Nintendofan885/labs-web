while [ $(date +%H:%M) != "15:00" ]; do sleep 1; done
pwb.py login -lang:commons -family:commons
pwb.py replace.py -page:Template:POTY2019/state "beforeR2" "duringR2" -always -summary:"POTY SETUP" -lang:commons -family:commons
