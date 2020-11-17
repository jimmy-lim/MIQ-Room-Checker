# MIQ-Room-Checker
This is a Tampermonkey script to check for vacancy of NZ MIQ rooms between defined dates.

To use simply:
- load the file into your fav browser's (Chrome/Opera/Firefox) extension (Tampermonekey / Greasemonkey)
- change the @match URL to your URL at the page of "STEP TWO - Hold your accommodation" and SAVE.
- enable the script, it'll prompt for mindate and maxdate at the first run.
- watch it reload the page at defined interval until an alert is prompted, then quickly do your booking MANUALLY !!!

Note:
- mindate and maxdate are in YYYY-MM-DD format, zero-padded
- to reset the date, F12 -> Application -> Clear Storage -> Clear site data
