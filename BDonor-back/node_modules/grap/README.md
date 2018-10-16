# GRAP
Utility that GReps for gAPs and out of sequence line in log files

For example, given the logs file in `test/sample.log`:

```
Dec 08 03:00:14.035 DEBUG  Something interesting happened
Dec 08 03:00:14.036 DEBUG  Something interesting happened
Dec 08 03:00:14.037 DEBUG  Something interesting happened
Dec 08 03:00:14.025 DEBUG  Something interesting happened
Dec 08 02:00:14.038 DEBUG  Something interesting happened
Dec 08 03:00:16.035 DEBUG  Something interesting happened
Dec 08 03:00:15.035 DEBUG  Something interesting happened
```

Anything look out of place to you? Probably not. humans are not very good at performing repetitive tasks.

Let's run grap to see what it finds:

```
# grap test/sample.log
Dec 08 03:00:14.025 DEBUG  Something interesting happened
Dec 08 02:00:14.038 DEBUG  Something interesting happened
Dec 08 03:00:15.035 DEBUG  Something interesting happened
```