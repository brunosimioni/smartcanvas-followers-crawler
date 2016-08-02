# smartcanvas-followers-crawler


Usage:

Remove session cookies (if any)
`rm /tmp/cookies.txt`

Authenticate using G+ CI&T account
`casperjs smartcanvas-login.js --username="USERNAME" --password="PASSWORD" --ssl-protocol=any --ignore-ssl-errors=true --cookies-file=/tmp/cookies.txt`

Get "Use Acctk": TOKEN messagem from casperjs log output, and use it in following command:

Scrap users
`node smartcanvas-get-followers.js ACCTK_VALUE`
