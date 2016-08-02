# smartcanvas-followers-crawler


Usage:

rm /tmp/cookies.txt
casperjs smartcanvas-login.js --username="USERNAME" --password="PASSWORD" --ssl-protocol=any --ignore-ssl-errors=true --cookies-file=/tmp/cookies.txt

Get "Use Acctk": TOKEN messagem from casperjs log output, and use it in following command:

node smartcanvas-get-followers.js ACCTK_VALUE
