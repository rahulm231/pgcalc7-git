function namespace(n){for(var r=n.split("."),t="",i=0;i<r.length;i++)i>0&&(t+="."),t+=r[i],eval(t+" = typeof("+t+") == 'undefined' || "+t+" == null ? {} : "+t+";")}