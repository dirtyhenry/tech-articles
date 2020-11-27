---
layout: post
title: "Excel: exporting a chart as a PNG image"
categories: [windows, excel]
---

This Excel macro will help you export a chart to a PNG file to `d:/temp`:

```
Sub exportChartAsPNG()
Dim ChartName As String
Dim File As String
ChartName = ActiveChart.Name
File = "d:/temp/"
ActiveChart.Export Filename:=File &amp; ChartName &amp; ".png", FilterName:="PNG"
End Sub
```
