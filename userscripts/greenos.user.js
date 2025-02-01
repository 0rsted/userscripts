// ==UserScript==
// @name            NuttyVegan/GreenOS nostock fixer
// @namespace       http://tampermonkey.net/
// @version         1.0.0
// @description     Make sure that we can see what is sould out, and remove the button to make the difference more obvious.\nMight work on other woocommerce pages.
// @description:dk  Sørg for at vi kan se hvad der er udsolgt, og fjern knappen på udsolgte varer for at gøre forskellen tydeligere.\nVirker muligvis også på andre woocommerce sider.
// @author          0rsted
// @website         https://0rsted.github.io/userscripts/
// @updateURL       https://0rsted.github.io/userscripts/userscripts/greenos.user.js
// @downloadURL     https://0rsted.github.io/userscripts/userscripts/greenos.user.js
// @run-in          normal-tabs
// @run-at          document-start
// @match           *://*.greenos.dk/*
// @match           *://*.nuttyvegan.dk/*
// @icon            data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAulBMVEUAAABNwyFry0RaxzFix2Zry0dry0ROwyJry0R/z3JlyUFOwydpy0JcxzRNwyFNwyFry0Rry0Tb7f/P6e9ry0PZ7P/X6//Z7Pyi2a+038iu3MKBzaeV1Z55zXbV6/fS6f/H5P/B4f+03P6/4Pu13PrS6fLC4++r2e7H5eWc1ceS0cWb1qd8z2xwzF1kyUVbxzTL5+rJ5ufD5N294dm74dK03cyU1ZaL0ouDz4iC0HtryVhvzFNty0hoykZLQu7pAAAAEnRSTlMAm5kJ/vraMjH++/vy29vDv01qslAZAAAAsklEQVQY02WP1xqCMAyFSxmComJa9nCiKMu9ff/XMgU/b/ivsk5yQgQ9adhXNaqTFllStmvHZr5B5SYfh0sbEDf4mOaEECmcgyCNOecW6pWVA4I7f/F3oRNpN3O9A0AWByWPfEpGmykkMYNs/+QFYxoZLFARRAB5fnQB1LbAapZUKSBqIwGIg8sDEJTgUgy8W+QB4lNxFm2dqvIsvBn6z1hScyYG6d96dMW+Z8nd5zrvfwFUYxM0dV1n9gAAAABJRU5ErkJggg==
// @icon64          data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAB8lBMVEUAAABgyTdVxSpry0ROwyJry0ROwyJOwyNOwyNry0Rry0Rry0RkyTxry0RTxSlPxCRNwyFNwyFNwyFry0ROwyJnykBOwyJOwyJry0ROwyNry0RPxCNPxCNry0RPxCRQxCVry0RSxCdry0Rry0Rry0Rry0RPxCNry0RoykFry0Rry0Rlyj5OwyJry0Rry0Rry0Rry0RaxjFry0RcxzNry0RPwyNry0Rry0Tb7f9ry0RNwyG13P/O5/9QxCXD5N5oykFmyj9WxS3Z7PxOwyPQ6fBdxzXY7PvZ7P+33f+x2/nK5+jX6/nT6vS74dKz3sdry0ViyTpbxzNTxSnR6f/B4f+94P6t2vB6zXt5zmVbxVJfyDdYxi7I5uW44NCx3sOb16CH0oBzzWNxzVPX6//F4/+z3PzV6/bN6OzM5+qr27+o27SHz66S1ZJpyHRryWRvzE+m2rKEz4mF0XxzzV5dxkxVxTjU6v/L5f/H5P/R6fKl2OGg1tu94tee1tKq3Lif16+i2ayK0ZJyyoiB0HN9z2x4zmJ0zVlTxDJQxCu1382U1KGS1Jlxy2u53v+o2OTH5eKg1ty74dOZ08+Y086Z1caR0cKR07SJ0aF7zJp4zmBfxl1kyFdsy1Zcxkal2bii2LSg2KiY1aeL04iCz4F0y3FZxUAgzr11AAAAOHRSTlMABBQR4dy0loyH867+zQn89vXw7evW1MyPe2pjW1ZBKSYiHfXlkHE86cfGv713dl07wreuhHBeUVa+iY0AAASFSURBVFjDtVdnV1NBEH3YldjF3nvvZXeeyTOFqCEYjAUVSUJUElAJKlixoth77/1/urMsbzcZn9GT4/1CksPd3Zm5c3fW8sK8mSOGTZ40tqnWt3R09chZ861/QdXs4UMAIFm7jbsYumjJ39IHTUN2eLdiG2usGvw39BHjJd2RnOyZljMJvcSokeWWqFo8AQSaHN7y+sXF/fvObz27PRoJ7ErfUktMnP5H/pwpSPc3tLx6ZNt7t25nGofbD3CJZXO9+TPGIT/YePmYvePoEVaCUP3p/jg2ex1/OCA6Ltu2LekU9Tc5YlHV7/hjhiE9fHynbe87yzxQ15ngju/Qug0rampqRq+o3mLwVyL/4CXcXsdOEPieDB5yC7xwrT6/3P/kfsHf6slubevw1zrcxehBlgsZ/w1x/B17vOihto/hQ9xAzWAj/+X5sR8QdEz+grlG/cfh+QXf9uQ3d8NuXoSNRgGnYP4w/nNe/F1h0MdXitLFXIz1w/zv9dw/DLW8FK6qB6H+jwv+Dq/6xbohyAkmDiRxhOC/2/mHAoYawe9wipHqANi/zwR/n2cCgCSAX8Ou6D/CNKyArSqQz1N+9D34Jan3y4egCqU3hJ21WpYA/ef5wAHu+ht7She4C5jBwrVY5DoElYxTrB49CheYjSU85mag+Q7cjxcvcArA4ekIC3S5UijEWQj9YQmK2CiBCrglZvLjfkj21TPWc1tn4pr4vV38nSoWwAgumhq4CvDhsGkCAA9yog8NfiGCHtUfwzyMwMYIzKKdEQy94APx/7kuQ0rtDIE+Od+aCQBvcIEjWja3oam3Vaeg4wKuakgpE2WItPg4S6ropeA/ZOae4Eu733KCzz4ZUsrEVbakltBInpS0QetHSPKnzED+NjQoevZKdMCdxLdqazIAYB+eZwY+AzQcqGMa11UAiUxK1ziCpmRNAoBjpY0cuSMIVwwnBNjGT3emAvEihaIrWmMBulURzB0FIxs3pNTE74eIxrPCliwA6KILPEX1tru3Eh7gMSN4K2LyWCD6U6SxbyAL90RAN5nHAjQEifu46S6l5W5Rgk7KlyGQJCo0YwwZJpHCbg5QvkwiLaOSwh0RA+9vqkbRhIUo4asyGkKiPSwrmcNoThC6EhKVskIbiMB75SeMIEXoSsq0mRRiIGrP83gWtJHDlK+aibazwnu5scxGA++jKlLtTAzFxT0Veg+AQ1OgDcWwNGqlmPyrWI42QleWRkxVIwLYgY+xiL9VgTTVtcTWDXRAWCShzi9SkKgjfGXr5GIx8BXAx9MBtKIMo5AXC7naiJr7vvmUi5MD4NVGLleaBIlmOq7dRBXR650mQYJemJ3m9W5t0gMGUQIiS2QUSOgBg4w45FanMrqAJVxulRuy8tgOiCulCchgBnFIKzPmdam5oKfESE7gj2uQV2bQvK6SECneX/Knai4ZdYs9gfMDxfFnkF9tDOzew3b8ASQdXihSQUC+O9aP+btxPxSLxXKtJeM+7j+msgfH1KrKnjxrKnt0LZ9b4bOv0odnhU/f//D4rvj5/wtTgx49dp926AAAAABJRU5ErkJggg==
// @grant           none
// ==/UserScript==

(function () {
  'use strict';
  const newStyles = document.createElement('style')
  newStyles.textContent = '.outofstock { background-color:darkslategray; opacity: 0.5; } .outofstock .woocommerce-loop-product__buttons { display:none; }'
  document.head.append(newStyles)
})();