/* ============================================
   FORESHADOW — VMPF-Style Interactions & Animations
   ============================================ */

console.log("main.js: Top-level code executed");

// Detect mobile devices and add class to html element
if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
  document.documentElement.classList.add('is-mobile');
}

// Global static fallback lists for gallery images
const STATIC_GALLERY_FALLBACKS = {
  'folder_1': [
    'https://iili.io/CoMdRtf.md.jpg',
    'https://iili.io/CoMdAwG.md.jpg',
    'https://iili.io/CoMduus.md.jpg',
    'https://iili.io/CoMdz8X.md.jpg',
    'https://iili.io/CoMdqnR.md.jpg',
    'https://iili.io/CoMddyg.md.jpg',
    'https://iili.io/CoMd93P.md.jpg',
    'https://iili.io/CoMJmGV.md.jpg',
    'https://iili.io/CoMJtZx.md.jpg',
    'https://iili.io/CoMJZjj.md.jpg',
    'https://iili.io/CoMJQTb.md.jpg',
    'https://iili.io/CoMJsyu.md.jpg',
    'https://iili.io/CoMJive.md.jpg',
    'https://iili.io/CoMJPa9.md.jpg',
    'https://iili.io/CoMJr4S.md.jpg',
    'https://iili.io/CoMJgG2.md.jpg',
    'https://iili.io/CoMJUCl.md.jpg',
    'https://iili.io/CoMJ8Q4.md.jpg',
    'https://iili.io/CoMJvjf.md.jpg',
    'https://iili.io/CoMJkTG.md.jpg',
    'https://iili.io/CoMJOps.md.jpg',
    'https://iili.io/CoMJNvn.md.jpg',
    'https://iili.io/CoMJj2t.md.jpg',
    'https://iili.io/CoMJVBp.md.jpg',
    'https://iili.io/CoMJGQR.md.jpg',
    'https://iili.io/CoMJlpa.md.jpg',
    'https://iili.io/CoMJckg.md.jpg',
    'https://iili.io/CoMJY21.md.jpg',
    'https://iili.io/CoMJ5rP.md.jpg',
    'https://iili.io/CoMJREB.md.jpg',
    'https://iili.io/CoMJABV.md.jpg',
    'https://iili.io/CoGyPYg.md.jpg',
    'https://iili.io/CoGygEP.md.jpg',
    'https://iili.io/CoGy8QV.md.jpg',
    'https://iili.io/CoGyvhQ.md.jpg',
    'https://iili.io/CoGyOpj.md.jpg',
    'https://iili.io/CoGyNkb.md.jpg',
    'https://iili.io/CoGyj2e.md.jpg',
    'https://iili.io/CoGyX49.md.jpg',
    'https://iili.io/CoGyWE7.md.jpg',
    'https://iili.io/CoGyEhl.md.jpg',
    'https://iili.io/CoGy1I4.md.jpg',
    'https://iili.io/CoGylpf.md.jpg',
    'https://iili.io/CoGyckG.md.jpg',
    'https://iili.io/CoGm4oB.md.jpg',
    'https://iili.io/CoGmgtV.md.jpg',
    'https://iili.io/CoGmUwQ.md.jpg',
    'https://iili.io/CoGmk8b.md.jpg',
    'https://iili.io/CoGmOFe.md.jpg',
    'https://iili.io/CoGmwP9.md.jpg',
    'https://iili.io/CoGmhnS.md.jpg',
    'https://iili.io/CoGmWt2.md.jpg',
    'https://iili.io/CoGmVwl.md.jpg',
    'https://iili.io/CoGmMu4.md.jpg',
    'https://iili.io/CoGm18G.md.jpg',
    'https://iili.io/CoGm0as.md.jpg',
    'https://iili.io/CoGma6X.md.jpg',
    'https://iili.io/CoGm7nI.md.jpg',
    'https://iili.io/CoGmRZN.md.jpg',
    'https://iili.io/CoGmAjp.md.jpg',
    'https://iili.io/CoGmuuR.md.jpg',
    'https://iili.io/CoGmxaa.md.jpg',
    'https://iili.io/CoGmqCP.md.jpg',
    'https://iili.io/CoGmKZB.md.jpg',
    'https://iili.io/CoGmFjV.md.jpg',
    'https://iili.io/CoGmHYb.md.jpg',
    'https://iili.io/CoGbp4e.md.jpg',
    'https://iili.io/CoGbbC7.md.jpg',
    'https://iili.io/CoGbtQS.md.jpg',
    'https://iili.io/CoGbivf.md.jpg',
    'https://iili.io/CoGb62s.md.jpg',
    'https://iili.io/CoGbr4n.md.jpg',
    'https://iili.io/CoGbgEX.md.jpg',
    'https://iili.io/CoGbUBt.md.jpg',
    'https://iili.io/CoGbOpR.md.jpg',
    'https://iili.io/CoGbwYJ.md.jpg',
    'https://iili.io/CoGbXrg.md.jpg',
    'https://iili.io/CoGbWEF.md.jpg',
    'https://iili.io/CoGbGLP.md.jpg',
    'https://iili.io/CoGbEhB.md.jpg',
    'https://iili.io/CoGb1IV.md.jpg',
    'https://iili.io/CoGblmQ.md.jpg',
    'https://iili.io/CoGbckx.md.jpg',
    'https://iili.io/CoGba7j.md.jpg',
    'https://iili.io/CoGbYdb.md.jpg',
    'https://iili.io/CoGb5ru.md.jpg',
    'https://iili.io/CoGbR1e.md.jpg',
    'https://iili.io/CoGbAB9.md.jpg',
    'https://iili.io/CoGbTL7.md.jpg',
    'https://iili.io/CoGbzI2.md.jpg',
    'https://iili.io/CoGboml.md.jpg',
    'https://iili.io/CoGbne4.md.jpg',
    'https://iili.io/CoGbBdG.md.jpg',
    'https://iili.io/CoGbK1n.md.jpg',
    'https://iili.io/CoGbFqX.md.jpg',
    'https://iili.io/CoGb2st.md.jpg',
    'https://iili.io/CoGb9bp.md.jpg',
    'https://iili.io/CoGDyeR.md.jpg',
    'https://iili.io/CoGDp5v.md.jpg',
    'https://iili.io/CoGDmdJ.md.jpg',
    'https://iili.io/CoGQDgf.md.jpg',
    'https://iili.io/CoGQt0G.md.jpg',
    'https://iili.io/CoGQZfs.md.jpg',
    'https://iili.io/CoGQLsn.md.jpg',
    'https://iili.io/CoGQsWX.md.jpg',
    'https://iili.io/CoGPvyP.md.jpg',
    'https://iili.io/CoGPk8B.md.jpg',
    'https://iili.io/CoGPw6x.md.jpg',
    'https://iili.io/CoGPjGj.md.jpg',
    'https://iili.io/CoGPWZu.md.jpg',
    'https://iili.io/CoGPVje.md.jpg',
    'https://iili.io/CoGPMu9.md.jpg',
    'https://iili.io/CoGPEy7.md.jpg',
    'https://iili.io/CoGP1vS.md.jpg',
    'https://iili.io/CoGP0a2.md.jpg',
    'https://iili.io/CoGPl3l.md.jpg',
    'https://iili.io/CoGPYGf.md.jpg',
    'https://iili.io/CoGP7CG.md.jpg',
    'https://iili.io/CoGPRQs.md.jpg',
    'https://iili.io/CoGPAjn.md.jpg',
    'https://iili.io/CoGPIpt.md.jpg',
    'https://iili.io/CoGPzvI.md.jpg',
    'https://iili.io/CoGPo2p.md.jpg',
    'https://iili.io/CoGPC4R.md.jpg',
    'https://iili.io/CoG48lV.md.jpg',
    'https://iili.io/CoG4vKQ.md.jpg',
    'https://iili.io/CoG4OVj.md.jpg',
    'https://iili.io/CoG4Nob.md.jpg',
    'https://iili.io/CoG4jDu.md.jpg',
    'https://iili.io/CoG4XR9.md.jpg',
    'https://iili.io/CoG4WH7.md.jpg',
    'https://iili.io/CoG4MSS.md.jpg',
    'https://iili.io/CoG4EKl.md.jpg',
    'https://iili.io/CoG40P4.md.jpg',
    'https://iili.io/CoG47Nn.md.jpg',
    'https://iili.io/CoG45AX.md.jpg',
    'https://iili.io/CoG4uSI.md.jpg',
    'https://iili.io/CoG4xPR.md.jpg',
    'https://iili.io/CoG4oMv.md.jpg',
    'https://iili.io/CoG4noJ.md.jpg',
    'https://iili.io/CoG4Bta.md.jpg',
    'https://iili.io/CoG4K91.md.jpg',
    'https://iili.io/CoG438P.md.jpg',
    'https://iili.io/CoG42cB.md.jpg',
    'https://iili.io/CoG49Mx.md.jpg',
    'https://iili.io/CoGrQ87.md.jpg',
    'https://iili.io/CoGrLaS.md.jpg',
    'https://iili.io/CoGrsF2.md.jpg',
    'https://iili.io/CoGrP6l.md.jpg',
    'https://iili.io/CoGrvyX.md.jpg',
    'https://iili.io/CoGrkvt.md.jpg',
    'https://iili.io/CoGreaI.md.jpg',
    'https://iili.io/CoGrO3N.md.jpg',
    'https://iili.io/CoGrw4p.md.jpg',
    'https://iili.io/CoGrjGR.md.jpg',
    'https://iili.io/CoGrhCv.md.jpg',
    'https://iili.io/CoGrWZJ.md.jpg',
    'https://iili.io/CoGrEyF.md.jpg',
    'https://iili.io/CoGr1v1.md.jpg',
    'https://iili.io/CoGr0YP.md.jpg',
    'https://iili.io/CoGrl3B.md.jpg',
    'https://iili.io/CoGSP6B.md.jpg',
    'https://iili.io/CoGS6GV.md.jpg',
    'https://iili.io/CoGSUjj.md.jpg',
    'https://iili.io/CoGSSTb.md.jpg',
    'https://iili.io/CoGSvyu.md.jpg',
    'https://iili.io/CoGSkve.md.jpg',
    'https://iili.io/CoGSea9.md.jpg',
    'https://iili.io/CoGSO37.md.jpg',
    'https://iili.io/CoGSw4S.md.jpg',
    'https://iili.io/CoGSVjf.md.jpg',
    'https://iili.io/CoGSMTG.md.jpg',
    'https://iili.io/CoGSEps.md.jpg',
    'https://iili.io/CoGS1vn.md.jpg',
    'https://iili.io/CoGS0YX.md.jpg',
    'https://iili.io/CoGSl2t.md.jpg',
    'https://iili.io/CoGSa4I.md.jpg',
    'https://iili.io/CoGSYEN.md.jpg',
    'https://iili.io/CoGSuTJ.md.jpg',
    'https://iili.io/CoGSIpa.md.jpg',
    'https://iili.io/CoGSzkg.md.jpg',
    'https://iili.io/CoGSo21.md.jpg',
    'https://iili.io/CoGOyN4.md.jpg',
    'https://iili.io/CoGOmHG.md.jpg',
    'https://iili.io/CoGODSs.md.jpg',
    'https://iili.io/CoGOZKX.md.jpg',
    'https://iili.io/CoGOsVI.md.jpg',
    'https://iili.io/CoGO6tp.md.jpg',
    'https://iili.io/CoGO4NR.md.jpg',
    'https://iili.io/CoGOrAv.md.jpg',
    'https://iili.io/CoGOgHJ.md.jpg',
    'https://iili.io/CoGOSSa.md.jpg',
    'https://iili.io/CoGO8cg.md.jpg',
    'https://iili.io/CoGOvKF.md.jpg',
    'https://iili.io/CoGOOMP.md.jpg',
    'https://iili.io/CoGONoB.md.jpg',
    'https://iili.io/CoGOjtV.md.jpg',
    'https://iili.io/CoGOhwQ.md.jpg',
    'https://iili.io/CoGOXAx.md.jpg',
    'https://iili.io/CoGOW9j.md.jpg',
    'https://iili.io/CoGOM8b.md.jpg',
    'https://iili.io/CoGOGcu.md.jpg',
    'https://iili.io/CoGOEFe.md.jpg',
    'https://iili.io/CoGO0P9.md.jpg',
    'https://iili.io/CoGOlM7.md.jpg',
    'https://iili.io/CoGOcnS.md.jpg',
    'https://iili.io/CoGOYt2.md.jpg',
    'https://iili.io/CoGO7wl.md.jpg',
    'https://iili.io/CoGO5u4.md.jpg',
    'https://iili.io/CoGOR9f.md.jpg',
    'https://iili.io/CoGOu8G.md.jpg',
    'https://iili.io/CoGOTas.md.jpg',
    'https://iili.io/CoGOIFn.md.jpg',
    'https://iili.io/CoGOx6X.md.jpg',
    'https://iili.io/CoGjfu2.md.jpg',
    'https://iili.io/CoGj3v4.md.jpg',
    'https://iili.io/CoGjd3G.md.jpg',
    'https://iili.io/CoGj9Gn.md.jpg',
    'https://iili.io/CoGhyCX.md.jpg',
    'https://iili.io/CoGhbjI.md.jpg',
    'https://iili.io/CoGhZpp.md.jpg',
    'https://iili.io/CoGhLYv.md.jpg'
  ],
  'folder_2': [
    'https://iili.io/C73U6YP.jpg', 'https://iili.io/C73Ug4V.jpg',
    'https://iili.io/C73Uwv9.jpg', 'https://iili.io/C73UvQj.jpg',
    'https://iili.io/C73Ukhb.jpg', 'https://iili.io/C73UMB4.jpg',
    'https://iili.io/C73UY7t.jpg', 'https://iili.io/C73UakX.jpg',
    'https://iili.io/C73UA1p.jpg', 'https://iili.io/C73UzhJ.jpg',
    'https://iili.io/C73UxIa.jpg', 'https://iili.io/C73Unmg.jpg',
    'https://iili.io/C73UB71.jpg', 'https://iili.io/C73UqdP.jpg',
    'https://iili.io/C73UKrB.jpg', 'https://iili.io/C73UF1V.jpg',
    'https://iili.io/C73U3qQ.jpg', 'https://iili.io/C73UHzb.jpg',
    'https://iili.io/C73Symu.jpg', 'https://iili.io/C73Spee.jpg',
    'https://iili.io/C73Sbd7.jpg', 'https://iili.io/C73StgS.jpg',
    'https://iili.io/C73SZ12.jpg', 'https://iili.io/C73SQql.jpg',
    'https://iili.io/C73S4bs.jpg', 'https://iili.io/C73S8gI.jpg',
    'https://iili.io/C73Sren.jpg', 'https://iili.io/C73Sg5X.jpg',
    'https://iili.io/C73SNWv.jpg', 'https://iili.io/C73SwzJ.jpg',
    'https://iili.io/C73SXOg.jpg', 'https://iili.io/C73SW5F.jpg',
    'https://iili.io/C73STU7.jpg', 'https://iili.io/C73S5Ou.jpg',
    'https://iili.io/C73SAJ9.jpg', 'https://iili.io/C73SVJ1.jpg',
    'https://iili.io/C738Swb.jpg', 'https://iili.io/C738NFS.jpg',
    'https://iili.io/C738v9e.jpg', 'https://iili.io/C738eS9.jpg',
    'https://iili.io/C738qGV.jpg', 'https://iili.io/C738x8F.jpg',
    'https://iili.io/C738B6B.jpg', 'https://iili.io/C738n3P.jpg'
  ],
  'folder_3': [
    'assets/images/PKP-12.jpg'
  ],
  'folder_4': [
    'assets/images/FS-100.jpg', 'assets/images/FS-10.jpg',
    'assets/images/FS-101.jpg', 'assets/images/FS-102.jpg',
    'assets/images/FS-111.jpg'
  ],
  'folder_5': [
    'https://iili.io/CN2e0mP.md.jpg',
    'https://iili.io/CN2e7rx.md.jpg',
    'https://iili.io/CN2e2Xn.md.jpg',
    'https://iili.io/CN2eHbt.md.jpg',
    'https://iili.io/CN2OD0v.md.jpg',
    'https://iili.io/CN2OszF.md.jpg',
    'https://iili.io/CN2OUUQ.md.jpg',
    'https://iili.io/CN2OOxe.md.jpg',
    'https://iili.io/CN2OVUl.md.jpg',
    'https://iili.io/CN2O7RI.md.jpg',
    'https://iili.io/CN2OxVa.md.jpg',
    'https://iili.io/CN2OHMb.md.jpg',
    'https://iili.io/CN2NXZg.md.jpg',
    'https://iili.io/CN2NTy7.md.jpg',
    'https://iili.io/CN2NIvS.md.jpg',
    'https://iili.io/CN2Nn44.md.jpg',
    'https://iili.io/CN2NBCG.md.jpg',
    'https://iili.io/CN2wrEx.md.jpg',
    'https://iili.io/CN2wep9.md.jpg',
    'https://iili.io/CN2wN7S.md.jpg',
    'https://iili.io/CN2whrl.md.jpg',
    'https://iili.io/CN2wGXs.md.jpg',
    'https://iili.io/CN2wKqx.md.jpg',
    'https://iili.io/CN2jjOF.md.jpg',
    'https://iili.io/CN2jkiv.md.jpg',
    'https://iili.io/CN2jeWJ.md.jpg',
    'https://iili.io/CN2j0Vj.md.jpg',
    'https://iili.io/CN2jf9t.md.jpg',
    'https://iili.io/CN2jFSI.md.jpg',
    'https://iili.io/CN2h03N.md.jpg',
    'https://iili.io/CN2j3cN.md.jpg',
    'https://iili.io/CN2hc4p.md.jpg',
    'https://iili.io/CN2hTyF.md.jpg',
    'https://iili.io/CN2hATg.md.jpg',
    'https://iili.io/CN2jJPR.md.jpg'
  ],
  'folder_6': [
    'https://iili.io/CvJs1RV.md.jpg',
    'https://iili.io/CvJscUx.md.jpg',
    'https://iili.io/CvJsAx9.md.jpg',
    'https://iili.io/CvJszR2.md.jpg',
    'https://iili.io/CvJsxHl.md.jpg',
    'https://iili.io/CvJs2tt.md.jpg',
    'https://iili.io/CvJiySR.md.jpg',
    'https://iili.io/CvJitMg.md.jpg',
    'https://iili.io/CvJiiAB.md.jpg',
    'https://iili.io/CvJircx.md.jpg',
    'https://iili.io/CvJiet9.md.jpg',
    'https://iili.io/CvJiw92.md.jpg',
    'https://iili.io/CvJiEnn.md.jpg',
    'https://iili.io/CvJiljt.md.jpg',
    'https://iili.io/CvJiByB.md.jpg',
    'https://iili.io/CvJiqvV.md.jpg',
    'https://iili.io/CvJi2Eb.md.jpg',
    'https://iili.io/CvJiHQe.md.jpg',
    'https://iili.io/CvJPbv2.md.jpg',
    'https://iili.io/CvJPt24.md.jpg',
    'https://iili.io/CvJP4It.md.jpg',
    'https://iili.io/CvJPkrv.md.jpg',
    'https://iili.io/CvJPjhF.md.jpg',
    'https://iili.io/CvJPWmP.md.jpg',
    'https://iili.io/CvJPaLu.md.jpg',
    'https://iili.io/CvJPRm7.md.jpg',
    'https://iili.io/CvJPzg4.md.jpg',
    'https://iili.io/CvJPBXn.md.jpg',
    'https://iili.io/CvJPFeI.md.jpg',
    'https://iili.io/CvJPJgR.md.jpg',
    'https://iili.io/CvJP9qJ.md.jpg',
    'https://iili.io/CvJ6psa.md.jpg',
    'https://iili.io/CvJ66fj.md.jpg',
    'https://iili.io/CvJ6kRS.md.jpg',
    'https://iili.io/CvJ6Vxn.md.jpg',
    'https://iili.io/CvJ60HN.md.jpg',
    'https://iili.io/CvJ6Aog.md.jpg',
    'https://iili.io/CvJ6xHB.md.jpg',
    'https://iili.io/CvJ6H9S.md.jpg',
    'https://iili.io/CvJ4DPf.md.jpg',
    'https://iili.io/CvJ4rap.md.jpg',
    'https://iili.io/CvJ4OwF.md.jpg',
    'https://iili.io/CvJ4XaV.md.jpg',
    'https://iili.io/CvJ4M6x.md.jpg',
    'https://iili.io/CvJ4ECb.md.jpg',
    'https://iili.io/CvJ4Yy7.md.jpg',
    'https://iili.io/CvJ45a2.md.jpg',
    'https://iili.io/CvJ4u44.md.jpg',
    'https://iili.io/CvJ4xQs.md.jpg',
    'https://iili.io/CvJ4nTX.md.jpg',
    'https://iili.io/CvJ4qvI.md.jpg',
    'https://iili.io/CvJryTF.md.jpg',
    'https://iili.io/CvJ49hg.md.jpg',
    'https://iili.io/CvJrQrQ.md.jpg',
    'https://iili.io/CvJrsBj.md.jpg',
    'https://iili.io/CvJrkrl.md.jpg',
    'https://iili.io/CvJrwLG.md.jpg',
    'https://iili.io/CvJrlqv.md.jpg',
    'https://iili.io/CvJrAe1.md.jpg',
    'https://iili.io/CvJrCsj.md.jpg',
    'https://iili.io/CvJrJg2.md.jpg',
    'https://iili.io/CvJgZOX.md.jpg',
    'https://iili.io/CvJggWJ.md.jpg',
    'https://iili.io/CvJgwlV.md.jpg',
    'https://iili.io/CvJgENe.md.jpg',
    'https://iili.io/CvJg1R9.md.jpg',
    'https://iili.io/CvJgAoG.md.jpg',
    'https://iili.io/CvJgfPR.md.jpg',
    'https://iili.io/CvJUS6l.md.jpg',
    'https://iili.io/CvJUNun.md.jpg',
    'https://iili.io/CvJUXaI.md.jpg',
    'https://iili.io/CvJU5YP.md.jpg',
    'https://iili.io/CvJSD7t.md.jpg',
    'https://iili.io/CvJSS71.md.jpg',
    'https://iili.io/CvJShzb.md.jpg',
    'https://iili.io/CvJS012.md.jpg',
    'https://iili.io/CvJSAen.md.jpg',
    'https://iili.io/CvJS7zG.md.jpg',
    'https://iili.io/CvJS35F.md.jpg',
    'https://iili.io/CvJ8mWx.md.jpg',
    'https://iili.io/CvJ8iU7.md.jpg',
    'https://iili.io/CvJ8vNs.md.jpg',
    'https://iili.io/CvJ8XPp.md.jpg',
    'https://iili.io/CvJ8Vov.md.jpg',
    'https://iili.io/CvJ8YKB.md.jpg',
    'https://iili.io/CvJ85PV.md.jpg',
    'https://iili.io/CvJ8BFS.md.jpg',
    'https://iili.io/CvJ8KMl.md.jpg',
    'https://iili.io/CvJvLZv.md.jpg',
    'https://iili.io/CvJvg3P.md.jpg',
    'https://iili.io/CvJvM4S.md.jpg',
    'https://iili.io/CvJvcTG.md.jpg',
    'https://iili.io/CvJvBpa.md.jpg',
    'https://iili.io/CvJv3rP.md.jpg',
    'https://iili.io/CvJkL1S.md.jpg',
    'https://iili.io/CvJk4If.md.jpg',
    'https://iili.io/CvJkt29.md.jpg',
    'https://iili.io/CvJksB2.md.jpg'
  ],
  'folder_7': [
    'https://iili.io/C8OQ3nR.md.jpg',
    'https://iili.io/C8OQdZv.md.jpg',
    'https://iili.io/C8OLp8F.md.jpg',
    'https://iili.io/C8OLt6B.md.jpg',
    'https://iili.io/C8OLQCQ.md.jpg',
    'https://iili.io/C8OLPTb.md.jpg',
    'https://iili.io/C8OLsZx.md.jpg',
    'https://iili.io/C8OLijj.md.jpg',
    'https://iili.io/C8OL4yu.md.jpg',
    'https://iili.io/C8OLga9.md.jpg',
    'https://iili.io/C8OLU37.md.jpg',
    'https://iili.io/C8OL84S.md.jpg',
    'https://iili.io/C8OLvG2.md.jpg',
    'https://iili.io/C8OLOQ4.md.jpg',
    'https://iili.io/C8OLNjf.md.jpg',
    'https://iili.io/C8OLhps.md.jpg',
    'https://iili.io/C8OLXvn.md.jpg',
    'https://iili.io/C8OLV2t.md.jpg',
    'https://iili.io/C8OLWYX.md.jpg',
    'https://iili.io/C8OLEEN.md.jpg',
    'https://iili.io/C8OLlQR.md.jpg',
    'https://iili.io/C8OLaTJ.md.jpg',
    'https://iili.io/C8OLchv.md.jpg',
    'https://iili.io/C8OLA21.md.jpg',
    'https://iili.io/C8OLoLQ.md.jpg',
    'https://iili.io/C8OLK7e.md.jpg',
    'https://iili.io/C8OLF29.md.jpg',
    'https://iili.io/C8OLd1S.md.jpg',
    'https://iili.io/C8OLJB2.md.jpg',
    'https://iili.io/C8OsSea.md.jpg',
    'https://iili.io/C8OsvdF.md.jpg',
    'https://iili.io/C8OsO0P.md.jpg',
    'https://iili.io/C8OsjsV.md.jpg',
    'https://iili.io/C8OsVbj.md.jpg',
    'https://iili.io/C8OsG5u.md.jpg',
    'https://iili.io/C8OsEJe.md.jpg',
    'https://iili.io/C8Os0g9.md.jpg',
    'https://iili.io/C8Os5x4.md.jpg',
    'https://iili.io/C8Os7Wl.md.jpg',
    'https://iili.io/C8OsuOG.md.jpg',
    'https://iili.io/C8OsTRs.md.jpg',
    'https://iili.io/C8Os9l1.md.jpg',
    'https://iili.io/C8Oi4K7.md.jpg',
    'https://iili.io/C8OijcX.md.jpg',
    'https://iili.io/C8OiwSn.md.jpg',
    'https://iili.io/C8OiVMN.md.jpg',
    'https://iili.io/C8OiEtR.md.jpg',
    'https://iili.io/C8Oi1wv.md.jpg',
    'https://iili.io/C8OiYcF.md.jpg',
    'https://iili.io/C8Oixuj.md.jpg',
    'https://iili.io/C8OiC8u.md.jpg',
    'https://iili.io/C8OiK67.md.jpg',
    'https://iili.io/C8OiFGS.md.jpg',
    'https://iili.io/C8OiqF9.md.jpg',
    'https://iili.io/C8OiHuf.md.jpg',
    'https://iili.io/C8OPb3X.md.jpg',
    'https://iili.io/C8OPt4t.md.jpg',
    'https://iili.io/C8OPZGI.md.jpg',
    'https://iili.io/C8OPQCN.md.jpg',
    'https://iili.io/C8OPsQp.md.jpg',
    'https://iili.io/C8O6EJa.md.jpg',
    'https://iili.io/C8O60Ug.md.jpg',
    'https://iili.io/C8O4Et2.md.jpg',
    'https://iili.io/C8O4MnS.md.jpg',
    'https://iili.io/C8O4jcu.md.jpg',
    'https://iili.io/C8O4hFe.md.jpg',
    'https://iili.io/C8OPNhQ.md.jpg'
  ],
  'folder_8': [
    'https://iili.io/C8eFpSa.md.jpg',
    'https://iili.io/C8eFmcg.md.jpg',
    'https://iili.io/C8eFbKF.md.jpg',
    'https://iili.io/C8eFstV.md.jpg',
    'https://iili.io/C8eFQoB.md.jpg',
    'https://iili.io/C8eFr8b.md.jpg',
    'https://iili.io/C8eFUFe.md.jpg',
    'https://iili.io/C8eFknS.md.jpg',
    'https://iili.io/C8eFOt2.md.jpg',
    'https://iili.io/C8eFwu4.md.jpg',
    'https://iili.io/C8eFX8G.md.jpg',
    'https://iili.io/C8eFG6X.md.jpg',
    'https://iili.io/C8eFauR.md.jpg',
    'https://iili.io/C8eFcjp.md.jpg',
    'https://iili.io/C8eFnjV.md.jpg',
    'https://iili.io/C8eFoZB.md.jpg',
    'https://iili.io/C8eFF3u.md.jpg',
    'https://iili.io/C8eF24e.md.jpg',
    'https://iili.io/C8e3pTl.md.jpg',
    'https://iili.io/C8e3yj2.md.jpg',
    'https://iili.io/C8e3L4n.md.jpg',
    'https://iili.io/C8e36QI.md.jpg',
    'https://iili.io/C8e3v2a.md.jpg',
    'https://iili.io/C8e3OEF.md.jpg',
    'https://iili.io/C8e3hhB.md.jpg',
    'https://iili.io/C8e3NB1.md.jpg',
    'https://iili.io/C8e30ru.md.jpg',
    'https://iili.io/C8e37XS.md.jpg',
    'https://iili.io/C8e3Aml.md.jpg',
    'https://iili.io/C8e3ue4.md.jpg',
    'https://iili.io/C8e3nqX.md.jpg',
    'https://iili.io/C8e390g.md.jpg',
    'https://iili.io/C8e260u.md.jpg',
    'https://iili.io/C8e24fe.md.jpg',
    'https://iili.io/C8e2gs9.md.jpg',
    'https://iili.io/C8e2WiX.md.jpg',
    'https://iili.io/C8e2VVt.md.jpg',
    'https://iili.io/C8e2EDN.md.jpg',
    'https://iili.io/C8e20RR.md.jpg',
    'https://iili.io/C8e27Kg.md.jpg',
    'https://iili.io/C8e2RiF.md.jpg',
    'https://iili.io/C8e2IDB.md.jpg',
    'https://iili.io/C8e2CSj.md.jpg',
    'https://iili.io/C8e2qKu.md.jpg',
    'https://iili.io/C8e2Bcb.md.jpg',
    'https://iili.io/C8e2FV9.md.jpg',
    'https://iili.io/C8e2dtS.md.jpg',
    'https://iili.io/C8e2HAl.md.jpg',
    'https://iili.io/C8e2JN2.md.jpg',
    'https://iili.io/C8edpSf.md.jpg',
    'https://iili.io/C8edmcG.md.jpg',
    'https://iili.io/C8edPup.md.jpg',
    'https://iili.io/C8ed69R.md.jpg',
    'https://iili.io/C8ed86g.md.jpg',
    'https://iili.io/C8edOZP.md.jpg',
    'https://iili.io/C8edNwB.md.jpg',
    'https://iili.io/C8edwuV.md.jpg',
    'https://iili.io/C8edX8x.md.jpg',
    'https://iili.io/C8ed1n9.md.jpg',
    'https://iili.io/C8ed7yl.md.jpg',
    'https://iili.io/C8edRaf.md.jpg',
    'https://iili.io/C8edA3G.md.jpg',
    'https://iili.io/C8edIGn.md.jpg',
    'https://iili.io/C8edT4s.md.jpg',
    'https://iili.io/C8edCTN.md.jpg',
    'https://iili.io/C8edqpp.md.jpg',
    'https://iili.io/C8eJUp2.md.jpg',
    'https://iili.io/C8eJSkl.md.jpg',
    'https://iili.io/C8eJv2f.md.jpg',
    'https://iili.io/C8eJO1s.md.jpg',
    'https://iili.io/C8eJ7X1.md.jpg',
    'https://iili.io/C8eJAmB.md.jpg',
    'https://iili.io/C8eJT5Q.md.jpg',
    'https://iili.io/C8eJxgj.md.jpg',
    'https://iili.io/C8eJnqu.md.jpg',
    'https://iili.io/C8eJfz7.md.jpg',
    'https://iili.io/C8eJFbS.md.jpg',
    'https://iili.io/C8eHyfs.md.jpg',
    'https://iili.io/C8eHDxt.md.jpg',
    'https://iili.io/C8eHbWX.md.jpg',
    'https://iili.io/C8eHLRp.md.jpg',
    'https://iili.io/C8eH60J.md.jpg',
    'https://iili.io/C8eH4fa.md.jpg',
    'https://iili.io/C8eHSx1.md.jpg',
    'https://iili.io/C8eHkOB.md.jpg',
    'https://iili.io/C8eHjlj.md.jpg',
    'https://iili.io/C8eHwUx.md.jpg',
    'https://iili.io/C8eHhKb.md.jpg',
    'https://iili.io/C8eHMx9.md.jpg',
    'https://iili.io/C8eH0R2.md.jpg',
    'https://iili.io/C8eHlHl.md.jpg',
    'https://iili.io/C8eH7KG.md.jpg',
    'https://iili.io/C8eHxAN.md.jpg',
    'https://iili.io/C8eHo9p.md.jpg',
    'https://iili.io/C8eHCSR.md.jpg',
    'https://iili.io/C8eHBcv.md.jpg',
    'https://iili.io/C8eH3oF.md.jpg',
    'https://iili.io/C8eHdt1.md.jpg',
    'https://iili.io/C8eH99V.md.jpg',
    'https://iili.io/C8e9mcx.md.jpg',
    'https://iili.io/C8e9t6b.md.jpg',
    'https://iili.io/C8e9ZMu.md.jpg',
    'https://iili.io/C8e9iw7.md.jpg',
    'https://iili.io/C8e9ga4.md.jpg',
    'https://iili.io/C8e9knn.md.jpg',
    'https://iili.io/C8e9wuI.md.jpg',
    'https://iili.io/C8e9WaR.md.jpg',
    'https://iili.io/C8e9G6J.md.jpg',
    'https://iili.io/C8e9cj1.md.jpg',
    'https://iili.io/C8e97yB.md.jpg',
    'https://iili.io/C8e9T4j.md.jpg',
    'https://iili.io/C8e9oQe.md.jpg',
    'https://iili.io/C8e9CT7.md.jpg',
    'https://iili.io/C8e9JBs.md.jpg',
    'https://iili.io/C8e99Qn.md.jpg',
    'https://iili.io/C8OyiBa.md.jpg',
    'https://iili.io/C8OyUmP.md.jpg',
    'https://iili.io/C8OyO1j.md.jpg',
    'https://iili.io/C8OyjLu.md.jpg',
    'https://iili.io/C8OyVm7.md.jpg',
    'https://iili.io/C8OyMeS.md.jpg',
    'https://iili.io/C8Oy0g4.md.jpg',
    'https://iili.io/C8OycqG.md.jpg',
    'https://iili.io/C8OyT5N.md.jpg',
    'https://iili.io/C8OynqJ.md.jpg',
    'https://iili.io/C8OydJV.md.jpg',
    'https://iili.io/C8Opmib.md.jpg',
    'https://iili.io/C8OpQO7.md.jpg',
    'https://iili.io/C8OpSxn.md.jpg',
    'https://iili.io/C8Op0AP.md.jpg',
    'https://iili.io/C8OpaSV.md.jpg',
    'https://iili.io/C8OpVVa.md.jpg',
    'https://iili.io/C8OpMog.md.jpg'
  ]
};

const init = () => {
  console.log("main.js: init() started");

  // One-time localStorage reset for v3 fresh start (clean comments and likes)
  try {
    if (localStorage.getItem('foreshadow_v3_reset') !== 'true') {
      localStorage.removeItem('comments_folder_1');
      localStorage.removeItem('comments_folder_2');
      localStorage.removeItem('comments_folder_3');
      localStorage.removeItem('comments_folder_4');
      localStorage.removeItem('comments_folder_5');
      localStorage.removeItem('comments_folder_6');
      localStorage.removeItem('like_folder_1');
      localStorage.removeItem('like_folder_2');
      localStorage.removeItem('like_folder_3');
      localStorage.removeItem('like_folder_4');
      localStorage.removeItem('like_folder_5');
      localStorage.removeItem('like_folder_6');
      localStorage.setItem('foreshadow_v3_reset', 'true');
    }
    // One-time reset for likes to start fresh with v4 API namespace
    if (localStorage.getItem('foreshadow_likes_v4_reset') !== 'true') {
      localStorage.removeItem('like_folder_1');
      localStorage.removeItem('like_folder_2');
      localStorage.removeItem('like_folder_3');
      localStorage.removeItem('like_folder_4');
      localStorage.removeItem('like_folder_5');
      localStorage.removeItem('like_folder_6');
      localStorage.setItem('foreshadow_likes_v4_reset', 'true');
    }
  } catch (err) {
    console.warn('Could not reset localStorage:', err);
  }

  const apiBase = window.location.port === '3000' ? 'http://localhost:3000' : '';

  // ─────────────── Lenis Smooth Scroll ───────────────
  let lenis;
  try {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  } catch (e) { console.warn('Lenis not loaded'); }

  // ─────────────── Preloader / Cosmos 3D Loading Gate ───────────────
  const preloader = document.getElementById('preloader');
  const enterBtn = document.getElementById('enter-btn');
  const heroVideo = document.querySelector('.hero-video-bg video');

  if (heroVideo) {
    // Ensure video properties for strict browser autoplay policies
    heroVideo.muted = true;

    // Attempt to play immediately
    heroVideo.play().catch(err => console.warn('Autoplay initially prevented:', err));
  }

  // ─────────────── YouTube & Vimeo API SDK Injectors ───────────────
  // Dynamically load the YouTube Iframe Player API
  if (!window.YT) {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      document.head.appendChild(tag);
    }
  }

  // Dynamically load the Vimeo Player API
  if (typeof Vimeo === 'undefined' && !document.querySelector('script[src*="vimeo.com/api/player.js"]')) {
    const tag = document.createElement('script');
    tag.src = "https://player.vimeo.com/api/player.js";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      document.head.appendChild(tag);
    }
  }

  // ─────────────── Playback Persistence: Parameter Setup ───────────────
  // Ensure basic autoplay, mute, and jsapi parameters are set without reloading unless necessary
  const allIframes = document.querySelectorAll('iframe');
  allIframes.forEach(iframe => {
    let src = iframe.getAttribute('src');
    if (!src) return;

    let modified = false;

    // YouTube
    if (src.includes('youtube.com') || src.includes('youtu.be')) {
      if (!src.includes('enablejsapi=1')) {
        src += (src.includes('?') ? '&' : '?') + 'enablejsapi=1';
        modified = true;
      }
      if (!src.includes('cc_load_policy=')) {
        src += (src.includes('?') ? '&' : '?') + 'cc_load_policy=3';
        modified = true;
      } else if (src.includes('cc_load_policy=1')) {
        src = src.replace('cc_load_policy=1', 'cc_load_policy=3');
        modified = true;
      }
      if (!src.includes('autoplay=1')) {
        src += (src.includes('?') ? '&' : '?') + 'autoplay=1&mute=1&playsinline=1';
        if (src.includes('embed/') && !src.includes('playlist=')) {
          const videoId = src.split('embed/')[1].split(/[?&]/)[0];
          src += '&loop=1&playlist=' + videoId;
        }
        modified = true;
      }
    }

    if (modified) {
      iframe.setAttribute('src', src);
    }
  });

  // ─────────────── YouTube Player SDK Event Binding ───────────────
  window.activeYtIntervals = window.activeYtIntervals || new Map();
  window.activeYtPlayers = window.activeYtPlayers || new Map();
  window.activeVimeoPlayers = window.activeVimeoPlayers || new Map();
  window.footerPlayer = window.footerPlayer || null;

  // Background Looping Seek Helper (YouTube)
  const seekToSimulatedTime = (player, videoId) => {
    try {
      const savedTime = sessionStorage.getItem('yt_time_' + videoId);
      const savedRealTime = sessionStorage.getItem('yt_real_time_' + videoId);
      if (savedTime && savedRealTime) {
        const elapsedSecs = (Date.now() - parseInt(savedRealTime, 10)) / 1000;
        let targetTime = parseFloat(savedTime) + elapsedSecs;

        const duration = sessionStorage.getItem('yt_duration_' + videoId);
        if (duration && parseFloat(duration) > 0) {
          targetTime = targetTime % parseFloat(duration);
          if (typeof player.seekTo === 'function') {
            player.seekTo(targetTime, true);
          }
        } else if (typeof player.seekTo === 'function') {
          player.seekTo(parseFloat(savedTime), true);
        }
      }
    } catch (e) { }
  };

  // Background Looping Seek Helper (Vimeo)
  const seekToSimulatedTimeVimeo = (player, videoId) => {
    try {
      const savedTime = sessionStorage.getItem('vimeo_time_' + videoId);
      const savedRealTime = sessionStorage.getItem('vimeo_real_time_' + videoId);
      if (savedTime && savedRealTime) {
        const elapsedSecs = (Date.now() - parseInt(savedRealTime, 10)) / 1000;
        let targetTime = parseFloat(savedTime) + elapsedSecs;

        const duration = sessionStorage.getItem('vimeo_duration_' + videoId);
        if (duration && parseFloat(duration) > 0) {
          targetTime = targetTime % parseFloat(duration);
          player.setCurrentTime(targetTime).catch(() => { });
        } else {
          player.setCurrentTime(parseFloat(savedTime)).catch(() => { });
        }
      }
    } catch (e) { }
  };

  // IntersectionObserver to resume and sync background videos when they enter the viewport
  window.videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const iframe = entry.target;

        // Check YouTube players
        if (window.activeYtPlayers) {
          window.activeYtPlayers.forEach((player, videoId) => {
            try {
              if (player.getIframe() === iframe) {
                seekToSimulatedTime(player, videoId);
                if (typeof player.mute === 'function') {
                  if (videoId === 'PSAEz3Xyrvg') {
                    const soundBtn = document.getElementById('hero-sound-btn');
                    if (soundBtn && soundBtn.classList.contains('sound-on')) {
                      if (typeof player.unMute === 'function') {
                        player.unMute();
                      }
                    } else {
                      player.mute();
                    }
                  } else {
                    player.mute();
                  }
                }
                setTimeout(() => {
                  if (typeof player.playVideo === 'function') {
                    player.playVideo();
                  }
                }, 50);
              }
            } catch (e) { }
          });
        }

        // Check Vimeo players
        if (window.activeVimeoPlayers) {
          window.activeVimeoPlayers.forEach((player, videoId) => {
            try {
              if (player.element === iframe || (player.element && player.element.id === iframe.id)) {
                seekToSimulatedTimeVimeo(player, videoId);
                setTimeout(() => {
                  if (typeof player.play === 'function') {
                    player.play().catch(() => { });
                  }
                }, 50);
              }
            } catch (e) { }
          });
        }
      }
    });
  }, { threshold: 0.01 });

  // Helper to resume all players on focus or visibility change
  const resumeAllPlayers = () => {
    if (window.activeYtPlayers) {
      window.activeYtPlayers.forEach((player, videoId) => {
        try {
          seekToSimulatedTime(player, videoId);
          if (typeof player.mute === 'function') {
            if (videoId === 'PSAEz3Xyrvg') {
              const soundBtn = document.getElementById('hero-sound-btn');
              if (soundBtn && soundBtn.classList.contains('sound-on')) {
                if (typeof player.unMute === 'function') {
                  player.unMute();
                }
              } else {
                player.mute();
              }
            } else {
              player.mute();
            }
          }
          setTimeout(() => {
            if (typeof player.playVideo === 'function') {
              player.playVideo();
            }
          }, 100);
        } catch (e) {
          console.warn('Error resuming YouTube player:', e);
        }
      });
    }

    if (window.activeVimeoPlayers) {
      window.activeVimeoPlayers.forEach((player, videoId) => {
        try {
          seekToSimulatedTimeVimeo(player, videoId);
          setTimeout(() => {
            if (typeof player.play === 'function') {
              player.play().catch(() => { });
            }
          }, 100);
        } catch (e) {
          console.warn('Error resuming Vimeo player:', e);
        }
      });
    }
  };

  // Tab visibility change listener to auto-seek active videos to simulated background position
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      resumeAllPlayers();
    }
  });

  // Window focus listener to resume playback when returning to the application
  window.addEventListener('focus', () => {
    resumeAllPlayers();
  });

  window.onYouTubeIframeAPIReady = function () {
    const ytIframes = document.querySelectorAll('iframe[src*="youtube.com"], iframe[src*="youtu.be"]');
    ytIframes.forEach((iframe, idx) => {
      const isFooter = iframe.closest('.custom-footer') !== null;
      // Ensure the iframe has an ID for API binding
      if (!iframe.id) {
        iframe.id = 'yt-iframe-player-' + idx;
      }

      // Observe the iframe for viewport intersection to resume playing on scroll
      if (window.videoObserver) {
        window.videoObserver.observe(iframe);
      }

      const src = iframe.getAttribute('src');
      let videoId = '';
      if (src && src.includes('embed/')) {
        videoId = src.split('embed/')[1].split(/[?&]/)[0];
      }

      const player = new YT.Player(iframe.id, {
        events: {
          'onReady': function (event) {
            const playerObj = event.target;
            playerObj.mute(); // Muted autoplay fallback support
            try {
              if (typeof playerObj.unloadModule === 'function') {
                playerObj.unloadModule('captions');
                playerObj.unloadModule('cc');
              }
            } catch (e) { }
            if (isFooter) {
              window.footerPlayer = playerObj;
            }

            // Seek to simulated background position immediately
            if (videoId) {
              window.activeYtPlayers.set(videoId, playerObj);
              seekToSimulatedTime(playerObj, videoId);
            }
          },
          'onApiChange': function (event) {
            const player = event.target;
            try {
              if (typeof player.unloadModule === 'function') {
                player.unloadModule('captions');
                player.unloadModule('cc');
              }
            } catch (e) { }
          },
          'onStateChange': function (event) {
            const player = event.target;
            try {
              if (typeof player.unloadModule === 'function') {
                player.unloadModule('captions');
                player.unloadModule('cc');
              }
            } catch (e) { }
            const iframeEl = player.getIframe();
            if (!iframeEl) return;
            const src = iframeEl.getAttribute('src');
            if (!src) return;

            let videoId = '';
            if (src.includes('embed/')) {
              videoId = src.split('embed/')[1].split(/[?&]/)[0];
            } else {
              try {
                videoId = player.getVideoData().video_id;
              } catch (e) { }
            }
            if (!videoId) return;

            if (event.data === YT.PlayerState.PLAYING) {
              if (!window.activeYtIntervals.has(videoId)) {
                const intervalId = setInterval(() => {
                  try {
                    const time = player.getCurrentTime();
                    const duration = player.getDuration();
                    if (time !== undefined && time > 0) {
                      sessionStorage.setItem('yt_time_' + videoId, time);
                      sessionStorage.setItem('yt_real_time_' + videoId, Date.now());
                      if (duration && duration > 0) {
                        sessionStorage.setItem('yt_duration_' + videoId, duration);
                      }
                    }
                  } catch (e) { }
                }, 500);
                window.activeYtIntervals.set(videoId, intervalId);
              }
            } else {
              const intervalId = window.activeYtIntervals.get(videoId);
              if (intervalId) {
                clearInterval(intervalId);
                window.activeYtIntervals.delete(videoId);
              }
            }
          }
        }
      });
      if (videoId) {
        window.activeYtPlayers.set(videoId, player);
      }
    });
  };

  // If YouTube API is already loaded/ready (due to browser caching or duplicate script runs), trigger handler manually
  if (window.YT && typeof window.YT.Player === 'function') {
    window.onYouTubeIframeAPIReady();
  }

  // ─────────────── Vimeo Player SDK Event Binding ───────────────
  const bindVimeoPlayers = () => {
    if (typeof Vimeo === 'undefined') {
      setTimeout(bindVimeoPlayers, 150);
      return;
    }
    const vimeoIframes = document.querySelectorAll('iframe[src*="vimeo.com"]');
    vimeoIframes.forEach(iframe => {
      // Observe the iframe for viewport intersection to resume playing on scroll
      if (window.videoObserver) {
        window.videoObserver.observe(iframe);
      }

      try {
        const player = new Vimeo.Player(iframe);

        // Seek to simulated background position immediately
        const src = iframe.getAttribute('src');
        if (src) {
          let videoId = '';
          if (src.includes('video/')) {
            videoId = src.split('video/')[1].split(/[?&]/)[0];
          }
          if (videoId) {
            window.activeVimeoPlayers.set(videoId, player);
            seekToSimulatedTimeVimeo(player, videoId);
          }
        }

        player.on('timeupdate', function (data) {
          const src = iframe.getAttribute('src');
          if (src) {
            let videoId = '';
            if (src.includes('video/')) {
              videoId = src.split('video/')[1].split(/[?&]/)[0];
            }
            if (videoId) {
              sessionStorage.setItem('vimeo_time_' + videoId, data.seconds);
              sessionStorage.setItem('vimeo_real_time_' + videoId, Date.now());
              sessionStorage.setItem('vimeo_duration_' + videoId, data.duration);
            }
          }
        });
      } catch (e) {
        console.warn('Vimeo SDK error binding player:', e);
      }
    });
  };
  bindVimeoPlayers();

  const playHeroVideo = () => {
    const heroIframe = document.querySelector('.hero-video-bg iframe[data-src]');
    if (heroIframe) {
      const dataSrc = heroIframe.getAttribute('data-src');
      if (dataSrc) {
        heroIframe.setAttribute('src', dataSrc);
        heroIframe.removeAttribute('data-src');
      }
    }
  };

  const startHeroAnimations = () => {
    const hero = document.getElementById('hometop');
    if (hero) {
      hero.classList.add('start-anim');
    }
  };

  // ─────────────── Animated Gradient Loading Screen (WebGL) ───────────────
  const gradientLoader = document.getElementById('gradient-loader');
  const gradientCanvas = document.getElementById('gradient-canvas');

  if (gradientLoader && gradientCanvas) {
    const loaderPlayed = sessionStorage.getItem('fs_loader_played') === 'true';
    const navLogo = document.querySelector('.nav-logo-img');

    if (loaderPlayed) {
      gradientLoader.style.display = 'none';
      if (navLogo) gsap.set(navLogo, { opacity: 1 });
      playHeroVideo();
      startHeroAnimations();
    } else {
      if (navLogo) gsap.set(navLogo, { opacity: 0 });

      // Lock scroll while loading
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();

      // ── WebGL2 Animated Gradient Setup ──
      const gl = gradientCanvas.getContext('webgl2', {
        premultipliedAlpha: true,
        alpha: true,
        antialias: true,
      });

      if (gl) {
        // Vertex Shader
        const vertexShaderSource = `#version 300 es
        in vec4 a_position;
        void main() {
          gl_Position = a_position;
        }`;

        // Fragment Shader (ported from animated-gradient.tsx)
        const fragmentShaderSource = `#version 300 es
precision highp float;

uniform float u_time;
uniform float u_pixelRatio;
uniform vec2 u_resolution;

uniform float u_scale;
uniform float u_rotation;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;
uniform float u_proportion;
uniform float u_softness;
uniform float u_shape;
uniform float u_shapeScale;
uniform float u_distortion;
uniform float u_swirl;
uniform float u_swirlIterations;

out vec4 fragColor;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

vec4 blend_colors(vec4 c1, vec4 c2, vec4 c3, float mixer, float edgesWidth, float edge_blur) {
    vec3 color1 = c1.rgb * c1.a;
    vec3 color2 = c2.rgb * c2.a;
    vec3 color3 = c3.rgb * c3.a;

    float r1 = smoothstep(.0 + .35 * edgesWidth, .7 - .35 * edgesWidth + .5 * edge_blur, mixer);
    float r2 = smoothstep(.3 + .35 * edgesWidth, 1. - .35 * edgesWidth + edge_blur, mixer);

    vec3 blended_color_2 = mix(color1, color2, r1);
    float blended_opacity_2 = mix(c1.a, c2.a, r1);

    vec3 c = mix(blended_color_2, color3, r2);
    float o = mix(blended_opacity_2, c3.a, r2);
    return vec4(c, o);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    float t = .5 * u_time;

    float noise_scale = .0005 + .006 * u_scale;

    uv -= .5;
    uv *= (noise_scale * u_resolution);
    uv = rotate(uv, u_rotation * .5 * PI);
    uv /= u_pixelRatio;
    uv += .5;

    float n1 = noise(uv * 1. + t);
    float n2 = noise(uv * 2. - t);
    float angle = n1 * TWO_PI;
    uv.x += 4. * u_distortion * n2 * cos(angle);
    uv.y += 4. * u_distortion * n2 * sin(angle);

    float iterations_number = ceil(clamp(u_swirlIterations, 1., 30.));
    for (float i = 1.; i <= iterations_number; i++) {
        uv.x += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1.5 * uv.y);
        uv.y += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1. * uv.x);
    }

    float proportion = clamp(u_proportion, 0., 1.);

    float shape = 0.;
    float mixer = 0.;
    if (u_shape < .5) {
      vec2 checks_shape_uv = uv * (.5 + 3.5 * u_shapeScale);
      shape = .5 + .5 * sin(checks_shape_uv.x) * cos(checks_shape_uv.y);
      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
    } else if (u_shape < 1.5) {
      vec2 stripes_shape_uv = uv * (.25 + 3. * u_shapeScale);
      float f = fract(stripes_shape_uv.y);
      shape = smoothstep(.0, .55, f) * smoothstep(1., .45, f);
      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
    } else {
      float sh = 1. - uv.y;
      sh -= .5;
      sh /= (noise_scale * u_resolution.y);
      sh += .5;
      float shape_scaling = .2 * (1. - u_shapeScale);
      shape = smoothstep(.45 - shape_scaling, .55 + shape_scaling, sh + .3 * (proportion - .5));
      mixer = shape;
    }

    vec4 color_mix = blend_colors(u_color1, u_color2, u_color3, mixer, 1. - clamp(u_softness, 0., 1.), .01 + .01 * u_scale);

    fragColor = vec4(color_mix.rgb, color_mix.a);
}`;

        // Compile shaders
        function compileShader(type, source) {
          const shader = gl.createShader(type);
          gl.shaderSource(shader, source);
          gl.compileShader(shader);
          if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Shader compile error:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
          }
          return shader;
        }

        const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

        if (vertexShader && fragmentShader) {
          const program = gl.createProgram();
          gl.attachShader(program, vertexShader);
          gl.attachShader(program, fragmentShader);
          gl.linkProgram(program);
          gl.useProgram(program);

          // Full-screen quad
          const positionBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
          gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
            gl.STATIC_DRAW
          );

          const positionLocation = gl.getAttribLocation(program, 'a_position');
          gl.enableVertexAttribArray(positionLocation);
          gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

          // Uniform locations
          const uniforms = {
            u_time: gl.getUniformLocation(program, 'u_time'),
            u_resolution: gl.getUniformLocation(program, 'u_resolution'),
            u_pixelRatio: gl.getUniformLocation(program, 'u_pixelRatio'),
            u_scale: gl.getUniformLocation(program, 'u_scale'),
            u_rotation: gl.getUniformLocation(program, 'u_rotation'),
            u_color1: gl.getUniformLocation(program, 'u_color1'),
            u_color2: gl.getUniformLocation(program, 'u_color2'),
            u_color3: gl.getUniformLocation(program, 'u_color3'),
            u_proportion: gl.getUniformLocation(program, 'u_proportion'),
            u_softness: gl.getUniformLocation(program, 'u_softness'),
            u_shape: gl.getUniformLocation(program, 'u_shape'),
            u_shapeScale: gl.getUniformLocation(program, 'u_shapeScale'),
            u_distortion: gl.getUniformLocation(program, 'u_distortion'),
            u_swirl: gl.getUniformLocation(program, 'u_swirl'),
            u_swirlIterations: gl.getUniformLocation(program, 'u_swirlIterations'),
          };

          // Gradient config — custom "Prism" silk waves style using #7D2826 instead of blue
          const gradientParams = {
            color1: [5 / 255, 5 / 255, 5 / 255, 1.0],       // #050505 (very dark gray background)
            color2: [125 / 255, 40 / 255, 38 / 255, 1.0],   // #7D2826 (crimson waves)
            color3: [1.0, 1.0, 1.0, 1.0],                   // #FFFFFF (bright silk highlight)
            rotation: -50,
            proportion: 1,
            scale: 0.01,
            speed: 30,
            distortion: 0,
            swirl: 50,
            swirlIterations: 16,
            softness: 47,
            offset: -299,
            shape: 0,        // Checks
            shapeSize: 45,
          };

          // Canvas resize
          function resizeGradientCanvas() {
            const w = gradientLoader.clientWidth;
            const h = gradientLoader.clientHeight;
            const pixelRatio = window.devicePixelRatio || 1;
            gradientCanvas.width = w * pixelRatio;
            gradientCanvas.height = h * pixelRatio;
            gradientCanvas.style.width = w + 'px';
            gradientCanvas.style.height = h + 'px';
            gl.viewport(0, 0, gradientCanvas.width, gradientCanvas.height);
          }

          resizeGradientCanvas();
          const gradientResizeObserver = new ResizeObserver(resizeGradientCanvas);
          gradientResizeObserver.observe(gradientLoader);

          let gradientAnimActive = true;
          const gradientStartTime = performance.now();

          // Animation loop
          function animateGradient(time) {
            if (!gradientAnimActive) return;

            const elapsed = (time - gradientStartTime) / 1000;
            const speed = (gradientParams.speed / 100) * 5;

            gl.uniform1f(uniforms.u_time, elapsed * speed + gradientParams.offset * 0.01);
            gl.uniform2f(uniforms.u_resolution, gradientCanvas.width, gradientCanvas.height);
            gl.uniform1f(uniforms.u_pixelRatio, window.devicePixelRatio || 1);
            gl.uniform1f(uniforms.u_scale, gradientParams.scale);
            gl.uniform1f(uniforms.u_rotation, (gradientParams.rotation * Math.PI) / 180);

            gl.uniform4f(uniforms.u_color1, ...gradientParams.color1);
            gl.uniform4f(uniforms.u_color2, ...gradientParams.color2);
            gl.uniform4f(uniforms.u_color3, ...gradientParams.color3);

            gl.uniform1f(uniforms.u_proportion, gradientParams.proportion / 100);
            gl.uniform1f(uniforms.u_softness, gradientParams.softness / 100);
            gl.uniform1f(uniforms.u_shape, gradientParams.shape);
            gl.uniform1f(uniforms.u_shapeScale, gradientParams.shapeSize / 100);
            gl.uniform1f(uniforms.u_distortion, gradientParams.distortion / 50);
            gl.uniform1f(uniforms.u_swirl, gradientParams.swirl / 100);
            gl.uniform1f(
              uniforms.u_swirlIterations,
              gradientParams.swirl === 0 ? 0 : gradientParams.swirlIterations
            );

            gl.drawArrays(gl.TRIANGLES, 0, 6);
            requestAnimationFrame(animateGradient);
          }

          requestAnimationFrame(animateGradient);

          // ── GSAP Letter Animation ──
          const introTl = gsap.timeline({ delay: 0.6 });
          const letters = gsap.utils.toArray('.gradient-letter');
          const enterBtn = document.getElementById('gradient-enter-btn');

          introTl.to(letters, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.06,
            ease: 'power3.out'
          });

          introTl.to(letters, {
            textShadow: '0 2px 20px rgba(0, 0, 0, 0.5), 0 0 80px rgba(125, 40, 38, 0.3), 0 0 120px rgba(125, 40, 38, 0.1)',
            duration: 0.6,
            ease: 'power1.inOut'
          }, '-=0.2');

          introTl.to(enterBtn, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out'
          }, '-=0.3');

          // ── Enter Button Click ──
          enterBtn.addEventListener('click', () => {
            enterBtn.style.pointerEvents = 'none';

            const revealTl = gsap.timeline({
              onComplete: () => {
                if (navLogo) gsap.set(navLogo, { opacity: 1 });
                document.body.style.overflow = '';
                if (lenis) lenis.start();

                gradientAnimActive = false;
                gradientResizeObserver.disconnect();

                // Clean up WebGL
                gl.deleteProgram(program);
                gl.deleteShader(vertexShader);
                gl.deleteShader(fragmentShader);
                gl.deleteBuffer(positionBuffer);

                gradientLoader.remove();
                sessionStorage.setItem('fs_loader_played', 'true');
              }
            });

            revealTl.to('.gradient-content', {
              opacity: 0,
              scale: 0.95,
              duration: 0.5,
              ease: 'power2.in'
            });

            revealTl.to(gradientLoader, {
              opacity: 0,
              duration: 1.2,
              ease: 'power2.inOut'
            }, '-=0.1');

            revealTl.call(() => {
              playHeroVideo();
              startHeroAnimations();
            }, null, '-=0.8');

            revealTl.to(navLogo, {
              opacity: 1,
              duration: 0.6,
              ease: 'power1.inOut'
            }, '-=0.6');
          });
        }
      }
    }
  } else {
    playHeroVideo();
    startHeroAnimations();
  }

  // ─────────────── Custom Cursor ───────────────
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.custom-cursor-dot');

  if (cursor && cursorDot && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverTargets = document.querySelectorAll('a, button, .portfolio-item, .portfolio-card, .story-entry, .portfolio-filter-btn, .film-card, .blog-card, .service-card, .masonry-item, .iconic-cell, .camera-photo-card, .nav-hamburger, .btn-vmpf, .carousel-slide, .aesthetic-slide, .aesthetic-slider-arrow, .crew-image-item');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
  }

  // ─────────────── Navigation (VMPF Style) ───────────────
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav-hamburger');
  const overlay = document.querySelector('.nav-overlay');
  const overlayLinks = document.querySelectorAll('.nav-overlay-link');

  if (nav) {
    const ethosSection = document.getElementById('ethos');
    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;

    const updateNavScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      let scrollThreshold = 100;

      if (ethosSection) {
        const ethosTop = ethosSection.getBoundingClientRect().top + scrollY;
        scrollThreshold = ethosTop - 100;
      }

      if (scrollY > scrollThreshold) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      // Hide on scroll DOWN, show on scroll UP (Only on the About page)
      const isAboutPage = window.location.pathname.includes('about.html') || 
                          window.location.pathname.endsWith('/about') || 
                          document.title.toLowerCase().includes('about');

      if (isAboutPage && scrollY > 150) {
        if (scrollY > lastScrollY + 5) {
          // Scrolling DOWN -> Hide navigation bar
          nav.classList.add('nav-hidden');
        } else if (scrollY < lastScrollY - 5) {
          // Scrolling UP -> Reveal navigation bar
          nav.classList.remove('nav-hidden');
        }
      } else {
        nav.classList.remove('nav-hidden');
      }

      // Toggle sound button visibility: hide once scrolled past 80% of hero height
      const soundBtn = document.getElementById('hero-sound-btn');
      if (soundBtn) {
        if (scrollY > window.innerHeight * 0.8) {
          soundBtn.classList.add('sound-btn-hidden');
        } else {
          soundBtn.classList.remove('sound-btn-hidden');
        }
      }

      lastScrollY = Math.max(0, scrollY);
    };

    window.addEventListener('scroll', updateNavScroll, { passive: true });
    window.addEventListener('resize', updateNavScroll, { passive: true });
    updateNavScroll();
  }

  if (hamburger && overlay) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      overlay.classList.toggle('open');
      document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
    });

    const observer = new MutationObserver(() => {
      overlayLinks.forEach((link, i) => {
        link.style.transitionDelay = overlay.classList.contains('open') ? `${0.1 + i * 0.08}s` : '0s';
      });
    });
    observer.observe(overlay, { attributes: true, attributeFilter: ['class'] });

    document.querySelectorAll('.nav-overlay-link, .nav-overlay-dropdown-link').forEach(link => {
      link.addEventListener('click', (e) => {
        if (link.id === 'mobile-more-toggle') {
          e.preventDefault();
          return;
        }
        hamburger.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Mobile submenu toggle handler
    const mobileMoreToggle = document.getElementById('mobile-more-toggle');
    const mobileSubmenu = document.getElementById('mobile-submenu');
    if (mobileMoreToggle && mobileSubmenu) {
      mobileMoreToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        mobileSubmenu.classList.toggle('open');
        mobileMoreToggle.classList.toggle('active');
      });
    }
  }

  // ─────────────── Page Transition Links ───────────────
  const pageTransition = document.querySelector('.page-transition');
  if (pageTransition) {
    setTimeout(() => {
      pageTransition.classList.add('loaded');
    }, 100);
  }

  // Force page transition slide-out on pageshow (handles bfcache/back navigation)
  window.addEventListener('pageshow', () => {
    if (pageTransition) {
      pageTransition.classList.add('loaded');
    }
  });

  document.querySelectorAll('a[data-page]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (pageTransition) {
        pageTransition.classList.remove('loaded');
        setTimeout(() => { window.location.href = href; }, 750);
      } else {
        window.location.href = href;
      }
    });
  });

  // ─────────────── Hero Text Split Animation ───────────────
  const heroTitle = document.querySelector('.home-hero-title');
  if (heroTitle) {
    const html = heroTitle.innerHTML;
    // Split by <br> tags to preserve line breaks
    const lines = html.split(/<br\s*\/?>/i);
    heroTitle.innerHTML = '';

    lines.forEach((line, li) => {
      const lineText = line.trim();
      const words = lineText.split(' ');

      words.forEach((word, wi) => {
        const wordSpan = document.createElement('span');
        wordSpan.style.display = 'inline-block';

        word.split('').forEach((char, ci) => {
          const charSpan = document.createElement('span');
          charSpan.className = 'char';
          charSpan.textContent = char;
          charSpan.style.animationDelay = `${0.3 + (li * 0.4) + (wi * 0.12) + (ci * 0.04)}s`;
          wordSpan.appendChild(charSpan);
        });

        heroTitle.appendChild(wordSpan);

        if (wi < words.length - 1) {
          const space = document.createElement('span');
          space.innerHTML = '&nbsp;';
          space.className = 'char';
          space.style.animationDelay = `${0.3 + (li * 0.4) + (wi * 0.12) + (word.length * 0.04)}s`;
          heroTitle.appendChild(space);
        }
      });

      if (li < lines.length - 1) {
        heroTitle.appendChild(document.createElement('br'));
      }
    });
  }



  // ─────────────── Hero Background Slideshow ───────────────
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-slide-dot');
  let currentHeroSlide = 0;
  let heroSlideInterval;

  function showHeroSlide(index) {
    heroSlides.forEach(s => s.classList.remove('active'));
    heroDots.forEach(d => d.classList.remove('active'));
    if (heroSlides[index]) heroSlides[index].classList.add('active');
    if (heroDots[index]) heroDots[index].classList.add('active');
    currentHeroSlide = index;
  }

  if (heroSlides.length > 1) {
    heroSlideInterval = setInterval(() => {
      showHeroSlide((currentHeroSlide + 1) % heroSlides.length);
    }, 5000);

    heroDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(heroSlideInterval);
        showHeroSlide(i);
        heroSlideInterval = setInterval(() => {
          showHeroSlide((currentHeroSlide + 1) % heroSlides.length);
        }, 5000);
      });
    });
  }

  // ─────────────── Full-Width Image Carousel (VMPF Swiper-Style) ───────────────
  const carouselTrack = document.getElementById('carousel-track');
  const carouselSlides = document.querySelectorAll('.carousel-slide');
  let currentCarousel = 0;
  let carouselInterval;

  function goToCarouselSlide(index) {
    if (carouselSlides.length === 0) return;
    if (index < 0) index = carouselSlides.length - 1;
    if (index >= carouselSlides.length) index = 0;
    currentCarousel = index;

    if (carouselTrack) {
      carouselTrack.style.transform = `translateX(-${currentCarousel * 100}%)`;
    }

    carouselSlides.forEach(s => s.classList.remove('active'));
    if (carouselSlides[currentCarousel]) carouselSlides[currentCarousel].classList.add('active');
  }

  if (carouselSlides.length > 1) {
    goToCarouselSlide(0);
    carouselInterval = setInterval(() => {
      goToCarouselSlide(currentCarousel + 1);
    }, 5000);

    // Touch swipe for carousel
    const carouselEl = document.getElementById('image-carousel');
    if (carouselEl) {
      let touchStartX = 0, touchEndX = 0;
      carouselEl.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      carouselEl.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
          clearInterval(carouselInterval);
          if (diff > 0) goToCarouselSlide(currentCarousel + 1);
          else goToCarouselSlide(currentCarousel - 1);
          carouselInterval = setInterval(() => goToCarouselSlide(currentCarousel + 1), 5000);
        }
      }, { passive: true });
    }
  }

  // ─────────────── TWF-Style Image Slider (Legacy, for subpages) ───────────────
  const sliderTrack = document.querySelector('.twf-slider-track');
  const slides = document.querySelectorAll('.twf-slide');
  const sliderDots = document.querySelectorAll('.twf-slider-dot');
  const prevBtn = document.querySelector('.twf-slider-prev');
  const nextBtn = document.querySelector('.twf-slider-next');
  let currentSlide = 0;
  let sliderInterval;

  function goToSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentSlide = index;

    if (sliderTrack) {
      sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    slides.forEach(s => s.classList.remove('active'));
    sliderDots.forEach(d => d.classList.remove('active'));
    if (slides[currentSlide]) slides[currentSlide].classList.add('active');
    if (sliderDots[currentSlide]) sliderDots[currentSlide].classList.add('active');
  }

  function startSliderAuto() {
    sliderInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
  }

  function resetSliderAuto() {
    clearInterval(sliderInterval);
    startSliderAuto();
  }

  if (slides.length > 0) {
    goToSlide(0);
    startSliderAuto();

    if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); resetSliderAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); resetSliderAuto(); });

    sliderDots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goToSlide(i); resetSliderAuto(); });
    });

    // Touch/swipe
    let touchStartX = 0, touchEndX = 0;
    const slider = document.querySelector('.twf-slider');
    if (slider) {
      slider.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
      slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) goToSlide(currentSlide + 1);
          else goToSlide(currentSlide - 1);
          resetSliderAuto();
        }
      }, { passive: true });
    }
  }

  // ─────────────── Scroll Reveal ───────────────
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));


  // ─────────────── Counter Animation ───────────────
  const counters = document.querySelectorAll('.about-stat-number');
  let counterAnimated = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counterAnimated) {
        counterAnimated = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-count'));
          const suffix = counter.getAttribute('data-suffix') || '';
          let current = 0;
          const increment = target / 60;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) { current = target; clearInterval(timer); }
            counter.textContent = Math.floor(current) + suffix;
          }, 25);
        });
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  // ─────────────── Contact Form ───────────────
  const showFormNotification = (message, type = 'info') => {
    let container = document.getElementById('form-notification-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'form-notification-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `form-toast form-toast--${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.classList.add('show');
    }, 50);

    // Animate out
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 500);
    }, 4500);
  };

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('.fs-form-submit');
      const originalText = submitBtn.textContent;

      // Extract form values
      const firstNameVal = document.getElementById('first-name')?.value.trim() || '';
      const lastNameVal = document.getElementById('last-name')?.value.trim() || '';
      const fullName = `${firstNameVal} ${lastNameVal}`.trim();

      const emailVal = document.getElementById('email')?.value.trim() || '';
      const phoneVal = document.getElementById('phone')?.value.trim() || '';
      const subjectVal = document.getElementById('subject')?.value.trim() || '';
      const sourceVal = document.getElementById('source')?.value || '';
      const weddingDatesVal = document.getElementById('wedding-dates')?.value.trim() || '';
      const weddingLocationVal = document.getElementById('wedding-location')?.value.trim() || '';
      const eventsDetailsVal = document.getElementById('events-details')?.value.trim() || '';

      // Client-side validations
      if (!firstNameVal || !lastNameVal) {
        showFormNotification('Please enter your first name and last name.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailVal)) {
        showFormNotification('Please enter a valid email address.', 'error');
        return;
      }

      const phoneRegex = /^[+]?[0-9\s\-()]{7,20}$/;
      if (!phoneRegex.test(phoneVal)) {
        showFormNotification('Please enter a valid phone number (at least 7 digits).', 'error');
        return;
      }

      if (!subjectVal) {
        showFormNotification('Please enter a subject.', 'error');
        return;
      }

      if (!weddingDatesVal || !weddingLocationVal || !eventsDetailsVal) {
        showFormNotification('Please fill out all required fields.', 'error');
        return;
      }

      // Honeypot check for spam prevention
      const honeypotVal = document.getElementById('website')?.value;
      if (honeypotVal) {
        console.warn('Spam detected via honeypot');
        showFormNotification('Enquiry submitted successfully.', 'success');
        contactForm.reset();
        return;
      }

      // Update button state
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Construct payload for the backend API (using expected snake_case keys)
      const payload = {
        access_key: '869cbdae-ec04-4b53-8594-0b07b34f29d3',
        name: fullName,
        email: emailVal,
        phone: phoneVal,
        subject: subjectVal,
        source: sourceVal,
        wedding_dates: weddingDatesVal,
        wedding_location: weddingLocationVal,
        events_details: eventsDetailsVal,
        from_name: 'ForeShadow Website Enquiry'
      };

      // Correct recipient address
      const recipient = 'ForeShadow <hello@foreshadow.in>';
      const emailSubject = `Wedding Enquiry — ${fullName} | ${subjectVal}`;

      const emailBody = [
        `Name: ${fullName}`,
        `Email: ${emailVal}`,
        `Phone: ${phoneVal}`,
        `Subject: ${subjectVal}`,
        `How did you hear about us: ${sourceVal || 'N/A'}`,
        ``,
        `Wedding Dates: ${weddingDatesVal}`,
        `Wedding Location: ${weddingLocationVal}`,
        ``,
        `Event & Guest Details:`,
        eventsDetailsVal,
        ``,
        `---`,
        `Sent via ForeShadow Contact Form`
      ].join('\n');

      // Construct mailto link
      const mailtoLink = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

      // Post to Web3Forms API
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Server returned error response');
          }
          return response.json();
        })
        .then(data => {
          if (data.success) {
            console.log('Enquiry submitted to Web3Forms:', data);

            // Show success feedback
            submitBtn.textContent = 'Enquiry Sent ✓';
            submitBtn.style.background = '#4a7c59';
            submitBtn.style.color = '#ffffff';
            submitBtn.style.borderColor = '#4a7c59';
            submitBtn.style.opacity = '1';

            showFormNotification('Enquiry submitted successfully!', 'success');
          } else {
            throw new Error(data.message || 'Submission failed');
          }

          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.style.color = '';
            submitBtn.style.borderColor = '';
            submitBtn.disabled = false;
            contactForm.reset();
          }, 4000);
        })
        .catch(error => {
          console.error('Error submitting enquiry to server:', error);

          // Fallback: Still open mail client even if the server is down
          window.location.href = mailtoLink;

          // Show warning/semi-success feedback
          submitBtn.textContent = 'Mail App Opened ✓';
          submitBtn.style.background = '#c9a054';
          submitBtn.style.color = '#ffffff';
          submitBtn.style.borderColor = '#c9a054';
          submitBtn.style.opacity = '1';

          showFormNotification('Mail app opened. (Server backup failed to save, but mail will send)', 'warning');

          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.style.color = '';
            submitBtn.style.borderColor = '';
            submitBtn.disabled = false;
            contactForm.reset();
          }, 4000);
        });
    });
  }

  const careersForm = document.getElementById('careers-form');
  if (careersForm) {
    careersForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = careersForm.querySelector('#careers-submit-btn');
      const originalText = submitBtn.textContent;

      // Extract form values
      const firstNameVal = document.getElementById('first-name')?.value.trim() || '';
      const lastNameVal = document.getElementById('last-name')?.value.trim() || '';
      const fullName = `${firstNameVal} ${lastNameVal}`.trim();

      const emailVal = document.getElementById('email')?.value.trim() || '';
      const phoneVal = document.getElementById('phone')?.value.trim() || '';
      const cityVal = document.getElementById('city')?.value.trim() || '';
      const openingVal = document.getElementById('opening')?.value || '';
      const aboutVal = document.getElementById('about')?.value.trim() || '';
      const portfolioProfVal = document.getElementById('portfolio-prof')?.value.trim() || '';
      const portfolioPersVal = document.getElementById('portfolio-pers')?.value.trim() || '';
      const relocateVal = document.getElementById('relocate')?.value || '';
      const instagramVal = document.getElementById('instagram')?.value.trim() || '';
      const experienceVal = document.getElementById('experience')?.value.trim() || '';

      // Client-side validations
      if (!firstNameVal || !lastNameVal) {
        showFormNotification('Please enter your first name and last name.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailVal)) {
        showFormNotification('Please enter a valid email address.', 'error');
        return;
      }

      const phoneRegex = /^[+]?[0-9\s\-()]{7,20}$/;
      if (!phoneRegex.test(phoneVal)) {
        showFormNotification('Please enter a valid contact number (at least 7 digits).', 'error');
        return;
      }

      if (!cityVal) {
        showFormNotification('Please enter your current city of residence.', 'error');
        return;
      }

      if (!openingVal) {
        showFormNotification('Please select a position of interest.', 'error');
        return;
      }

      if (!aboutVal) {
        showFormNotification('Please tell us about yourself.', 'error');
        return;
      }

      if (!portfolioProfVal) {
        showFormNotification('Please provide a link to your professional portfolio.', 'error');
        return;
      }

      if (!relocateVal) {
        showFormNotification('Please select if you are open to relocate.', 'error');
        return;
      }

      if (!experienceVal) {
        showFormNotification('Please fill out your professional experience.', 'error');
        return;
      }

      // Honeypot check for spam prevention
      const honeypotVal = document.getElementById('website')?.value;
      if (honeypotVal) {
        console.warn('Spam detected via honeypot');
        showFormNotification('Application submitted successfully.', 'success');
        careersForm.reset();
        return;
      }

      // Update button state
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Construct payload for the Web3Forms API
      const payload = {
        access_key: '869cbdae-ec04-4b53-8594-0b07b34f29d3',
        name: fullName,
        email: emailVal,
        phone: phoneVal,
        city: cityVal,
        position: openingVal,
        about_yourself: aboutVal,
        portfolio_professional: portfolioProfVal,
        portfolio_personal: portfolioPersVal || 'N/A',
        open_to_relocate: relocateVal,
        instagram: instagramVal || 'N/A',
        professional_experience: experienceVal,
        from_name: 'ForeShadow Careers Application',
        subject: `New Careers Application — ${fullName} | ${openingVal}`
      };

      // Fallback mailto link details
      const recipient = 'hello@foreshadow.in';
      const emailSubject = `Careers Application — ${fullName} | ${openingVal}`;
      const emailBody = [
        `Name: ${fullName}`,
        `Email: ${emailVal}`,
        `Contact Number: ${phoneVal}`,
        `Current City: ${cityVal}`,
        `Position: ${openingVal}`,
        `About Yourself: ${aboutVal}`,
        `Professional Portfolio: ${portfolioProfVal}`,
        `Personal Portfolio: ${portfolioPersVal || 'N/A'}`,
        `Open to Relocate to Bangalore: ${relocateVal}`,
        `Instagram Page: ${instagramVal || 'N/A'}`,
        ``,
        `Professional Experience:`,
        experienceVal,
        ``,
        `---`,
        `Sent via ForeShadow Careers Form`
      ].join('\n');

      const mailtoLink = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

      // Post to Web3Forms API
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Server returned error response');
          }
          return response.json();
        })
        .then(data => {
          if (data.success) {
            console.log('Application submitted to Web3Forms:', data);

            // Show success feedback
            submitBtn.textContent = 'Application Sent ✓';
            submitBtn.style.background = '#4a7c59';
            submitBtn.style.color = '#ffffff';
            submitBtn.style.borderColor = '#4a7c59';
            submitBtn.style.opacity = '1';

            showFormNotification('Application submitted successfully!', 'success');
          } else {
            throw new Error(data.message || 'Submission failed');
          }

          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.style.color = '';
            submitBtn.style.borderColor = '';
            submitBtn.disabled = false;
            careersForm.reset();
          }, 4000);
        })
        .catch(error => {
          console.error('Error submitting application to server:', error);

          // Fallback: open mail client
          window.location.href = mailtoLink;

          // Show warning/semi-success feedback
          submitBtn.textContent = 'Mail App Opened ✓';
          submitBtn.style.background = '#c9a054';
          submitBtn.style.color = '#ffffff';
          submitBtn.style.borderColor = '#c9a054';
          submitBtn.style.opacity = '1';

          showFormNotification('Mail app opened. (Server backup failed, mail client opened)', 'warning');

          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.style.color = '';
            submitBtn.style.borderColor = '';
            submitBtn.disabled = false;
            careersForm.reset();
          }, 4000);
        });
    });
  }

  // ─────────────── Fullscreen Image Lightbox ───────────────
  const imageLightbox = document.getElementById('lightbox-modal');
  const lightboxTrack = document.getElementById('lightbox-track');
  let lightboxSlides = [];
  let currentLightboxSlideIndex = 0;

  function showSlide(index) {
    lightboxSlides.forEach((slide, i) => {
      if (i === index) slide.classList.add('active');
      else slide.classList.remove('active');
    });
  }

  function nextSlide() {
    if (lightboxSlides.length <= 1) return;
    currentLightboxSlideIndex = (currentLightboxSlideIndex + 1) % lightboxSlides.length;
    showSlide(currentLightboxSlideIndex);
  }

  function prevSlide() {
    if (lightboxSlides.length <= 1) return;
    currentLightboxSlideIndex = (currentLightboxSlideIndex - 1 + lightboxSlides.length) % lightboxSlides.length;
    showSlide(currentLightboxSlideIndex);
  }

  function openLightbox(index, imageUrls) {
    if (!lightboxTrack || !imageLightbox) return;
    lightboxTrack.innerHTML = '';
    lightboxSlides = [];

    imageUrls.forEach((url, i) => {
      const slide = document.createElement('div');
      slide.className = 'lightbox-slide';
      const img = document.createElement('img');
      img.src = url.trim().replace(/\.md\.jpg$/, '.jpg');
      img.alt = `Gallery Image ${i + 1}`;
      slide.appendChild(img);
      lightboxTrack.appendChild(slide);
      lightboxSlides.push(slide);
    });

    currentLightboxSlideIndex = index;
    showSlide(currentLightboxSlideIndex);

    imageLightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
    document.addEventListener('keydown', handleKeyDown);

    // Push history state so back button closes lightbox
    history.pushState({ lightboxOpen: true }, '', '#lightbox');
  }

  function closeLightbox() {
    if (!imageLightbox) return;
    if (history.state && history.state.lightboxOpen) {
      history.back();
    } else {
      performCloseLightbox();
    }
  }

  function performCloseLightbox() {
    if (!imageLightbox) return;
    imageLightbox.classList.remove('active');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
    document.removeEventListener('keydown', handleKeyDown);
    setTimeout(() => {
      if (lightboxTrack) lightboxTrack.innerHTML = '';
      lightboxSlides = [];
    }, 500);
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowRight') nextSlide();
    else if (e.key === 'ArrowLeft') prevSlide();
    else if (e.key === 'Escape') closeLightbox();
  }

  if (imageLightbox && lightboxTrack) {
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioItems.forEach(item => {
      item.addEventListener('click', () => {
        const imagesStr = item.getAttribute('data-gallery-images');
        if (imagesStr) {
          const imageUrls = imagesStr.split(',').map(s => s.trim()).reverse();
          openLightbox(0, imageUrls);
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    imageLightbox.addEventListener('click', (e) => {
      if (e.target === imageLightbox || e.target.classList.contains('lightbox-content-container') || e.target === lightboxTrack) {
        closeLightbox();
      }
    });

    let touchStartX = 0;
    let touchEndX = 0;
    imageLightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    imageLightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
    }, { passive: true });
  }

  // ─────────────── Video Lightbox ───────────────
  const filmCards = document.querySelectorAll('.film-card');
  const videoLightbox = document.getElementById('lightbox-modal');
  const videoWrapper = document.getElementById('lightbox-video-wrapper');

  if (videoLightbox && videoWrapper && !lightboxTrack) {
    const closeBtn = document.getElementById('lightbox-close');

    function openVideo(url) {
      let finalUrl = '';
      if (url.includes('vimeo.com')) {
        // Extract ID and use player.vimeo.com for reliable embedding
        const vimeoId = url.split('/').pop().split('?')[0];
        finalUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&dnt=1&app_id=122963`;
      } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
        // Automatically extract the YouTube ID and convert it to a playable embed URL
        let videoId = '';
        if (url.includes('youtu.be/')) {
          videoId = url.split('youtu.be/')[1].split('?')[0];
        } else if (url.includes('watch?v=')) {
          videoId = url.split('watch?v=')[1].split('&')[0];
        } else if (url.includes('/embed/')) {
          videoId = url.split('/embed/')[1].split('?')[0];
        }

        if (videoId) {
          finalUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&cc_load_policy=3`;
        } else {
          finalUrl = url + (url.includes('?') ? '&' : '?') + 'autoplay=1&cc_load_policy=3';
        }
      }

      videoWrapper.innerHTML = `
        <iframe src="${finalUrl}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen frameborder="0" style="width:100%;height:100%;"></iframe>
      `;

      videoLightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
      document.addEventListener('keydown', handleKeyDown);

      // Push history state so back button closes video
      history.pushState({ videoOpen: true }, '', '#video');
    }

    function closeVideo() {
      if (history.state && history.state.videoOpen) {
        history.back();
      } else {
        performCloseVideo();
      }
    }

    function performCloseVideo() {
      videoLightbox.classList.remove('active');
      document.body.style.overflow = '';
      if (lenis) lenis.start();
      document.removeEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        videoWrapper.innerHTML = '';
      }, 500);
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape') closeVideo();
    }

    // ─────────────── Film Detail View & Suggestions ───────────────
    const detailSection = document.getElementById('film-detail-section');
    const pageHero = document.querySelector('.page-hero, .films-hero-minimal');
    const mainFilmsSection = document.querySelector('.films-section');
    const backBtn = document.getElementById('back-to-grid');

    function showFilmDetail(card) {
      if (!detailSection) return;

      const url = card.getAttribute('data-video-url');
      const playerWrapper = document.getElementById('detail-video-wrapper');
      const detailMeta = document.getElementById('detail-meta');
      const detailTitle = document.getElementById('detail-title');
      const detailExcerpt = document.getElementById('detail-excerpt');
      const suggestionsGrid = document.getElementById('suggestions-grid');

      // 1. Hide main views and show detail view
      if (pageHero) pageHero.style.display = 'none';
      if (mainFilmsSection) mainFilmsSection.style.display = 'none';
      detailSection.style.display = 'block';

      // 2. Set up player iframe
      let finalUrl = '';
      if (url.includes('vimeo.com')) {
        const vimeoId = url.split('/').pop().split('?')[0];
        finalUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&dnt=1&app_id=122963`;
      } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
        let videoId = '';
        if (url.includes('youtu.be/')) {
          videoId = url.split('youtu.be/')[1].split('?')[0];
        } else if (url.includes('watch?v=')) {
          videoId = url.split('watch?v=')[1].split('&')[0];
        } else if (url.includes('/embed/')) {
          videoId = url.split('/embed/')[1].split('?')[0];
        }
        finalUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&cc_load_policy=3`;
      }

      if (playerWrapper) {
        playerWrapper.innerHTML = `
          <iframe src="${finalUrl}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen frameborder="0" style="width:100%;height:100%;"></iframe>
        `;
      }

      // 3. Set metadata
      if (detailMeta) detailMeta.innerHTML = card.querySelector('.film-card-meta').innerHTML;
      if (detailTitle) detailTitle.textContent = card.querySelector('.film-card-title').textContent;
      if (detailExcerpt) detailExcerpt.textContent = card.querySelector('.film-card-excerpt').textContent;

      // 4. Generate suggestions (other 4 films)
      if (suggestionsGrid) {
        suggestionsGrid.innerHTML = '';
        const allFilms = Array.from(document.querySelectorAll('.films-section .film-card'));
        const suggestions = allFilms.filter(item => item.getAttribute('data-video-url') !== url);

        suggestions.forEach((suggFilm, index) => {
          const suggUrl = suggFilm.getAttribute('data-video-url');
          const suggCategory = suggFilm.querySelector('.film-category').textContent;
          const suggCategorySlug = suggFilm.getAttribute('data-category');
          
          // Safeguard in case the suggestion film card does not have a date
          const dateEl = suggFilm.querySelector('.film-date');
          const suggDate = dateEl ? dateEl.textContent : '';
          
          const suggTitle = suggFilm.querySelector('.film-card-title').textContent;
          const suggExcerpt = suggFilm.querySelector('.film-card-excerpt').textContent;
          const suggImgSrc = suggFilm.querySelector('img').src;

          const col = document.createElement('div');
          col.className = 'film-card reveal-scale revealed stagger-' + (index + 1);
          col.setAttribute('data-video-url', suggUrl);
          col.setAttribute('data-category', suggCategorySlug);
          col.setAttribute('tabindex', '0');
          col.setAttribute('role', 'button');
          col.setAttribute('aria-label', `Play ${suggTitle} Wedding Film`);

          col.innerHTML = `
            <div class="film-card-image">
              <img src="${suggImgSrc}" alt="${suggTitle} Wedding Film">
              <div class="film-play-btn">
                <svg viewBox="0 0 24 24">
                  <polygon points="5,3 19,12 5,21"></polygon>
                </svg>
              </div>
            </div>
            <div class="film-card-info">
              <div class="film-card-meta">
                <span class="film-category">${suggCategory}</span>
                ${suggDate ? `<span class="meta-dot">&bull;</span><span class="film-date">${suggDate}</span>` : ''}
              </div>
              <h3 class="film-card-title">${suggTitle}</h3>
              <p class="film-card-excerpt">${suggExcerpt}</p>
            </div>
          `;

          col.addEventListener('click', () => {
            const origIndex = Array.from(filmCards).indexOf(suggFilm);
            if (origIndex !== -1) {
              history.pushState({ filmIndex: origIndex }, '', `?film=${origIndex}`);
            }
            showFilmDetail(suggFilm);
          });

          suggestionsGrid.appendChild(col);
        });
      }

      // 5. Scroll to top
      if (typeof lenis !== 'undefined' && lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0 });
      }
    }

    function closeFilmDetail() {
      if (!detailSection) return;
      const playerWrapper = document.getElementById('detail-video-wrapper');
      if (playerWrapper) playerWrapper.innerHTML = '';
      detailSection.style.display = 'none';
      // Remove inline style so CSS restores the correct display (flex for video-hero)
      if (pageHero) pageHero.style.display = '';
      if (mainFilmsSection) mainFilmsSection.style.display = '';

      if (typeof lenis !== 'undefined' && lenis) {
        lenis.scrollTo(mainFilmsSection, { offset: -100, immediate: true });
      } else {
        mainFilmsSection.scrollIntoView({ behavior: 'auto' });
      }
    }

    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeFilmDetail();
        history.pushState(null, '', window.location.pathname);
      });
    }

    filmCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        const videoUrl = card.getAttribute('data-video-url');
        if (detailSection) {
          history.pushState({ filmIndex: index }, '', `?film=${index}`);
          showFilmDetail(card);
        } else {
          if (videoUrl) openVideo(videoUrl);
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeVideo);

    videoLightbox.addEventListener('click', (e) => {
      if (e.target === videoLightbox || e.target.classList.contains('lightbox-content-container')) {
        closeVideo();
      }
    });


    // Deep link directly to a specific film if passed via query parameter (e.g. films.html?film=0)
    const urlParams = new URLSearchParams(window.location.search);
    const filmIndex = urlParams.get('film');
    if (filmIndex !== null && filmCards[filmIndex]) {
      setTimeout(() => {
        showFilmDetail(filmCards[filmIndex]);
      }, 300);
    }
  }

  // ─────────────── Masonry Grid Lightbox ───────────────
  const masonryItems = document.querySelectorAll('.masonry-item');
  if (masonryItems.length > 0) {
    masonryItems.forEach((item, idx) => {
      item.addEventListener('click', () => {
        // Collect all masonry image URLs
        const allUrls = [];
        masonryItems.forEach(mi => {
          const img = mi.querySelector('img');
          if (img) allUrls.push(img.src);
        });
        openLightbox(idx, allUrls);
      });
    });
  }

  // ─────────────── Iconic Grid Lightbox ───────────────
  const iconicItems = document.querySelectorAll('.iconic-cell:not(.iconic-text-tile)');
  if (iconicItems.length > 0) {
    iconicItems.forEach((item, idx) => {
      item.addEventListener('click', () => {
        // Collect all iconic grid image URLs
        const allUrls = [];
        iconicItems.forEach(ii => {
          const img = ii.querySelector('img');
          if (img) allUrls.push(img.src);
        });
        openLightbox(idx, allUrls);
      });
    });
  }

  // ─────────────── Creations Gallery (Camera Scroll Gallery) ───────────────
  const cameraSection = document.getElementById('latest-creations-camera');
  const cameraPhotoCards = document.querySelectorAll('.camera-photo-card');
  const cameraPhotosContainer = document.getElementById('camera-photos-container');
  let scrollTimeout;

  const updateCameraGallery = () => {
    if (!cameraSection || cameraPhotoCards.length === 0) return;

    if (cameraPhotosContainer) {
      cameraPhotosContainer.classList.add('camera-scrolling');
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        cameraPhotosContainer.classList.remove('camera-scrolling');
      }, 150);
    }

    const rect = cameraSection.getBoundingClientRect();
    const sectionHeight = cameraSection.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY || window.pageYOffset;
    const sectionTop = rect.top + scrollY; // absolute offset top from document

    let progress;
    if (sectionHeight > viewportHeight) {
      // Sticky pinned scroll tracking
      const scrollDist = sectionHeight - viewportHeight;
      progress = (scrollY - sectionTop) / scrollDist;
    } else {
      // In-view scroll tracking for short/16:9 layouts on mobile/tablet
      // Fan out cards earlier when the section is in the lower-middle screen viewport
      const startScroll = sectionTop - viewportHeight * 0.85;
      const endScroll = sectionTop - viewportHeight * 0.15;
      const scrollDist = endScroll - startScroll;
      progress = scrollDist > 0 ? (scrollY - startScroll) / scrollDist : 1;
    }
    progress = Math.max(0, Math.min(1, progress));

    const isMobile = window.innerWidth <= 480;
    const isTablet = window.innerWidth <= 900 && window.innerWidth > 480;

    let targets = [];
    if (isMobile) {
      targets = [
        { tx: -45, ty: -55, rot: -15 },  // Card 1
        { tx: -20, ty: -75, rot: -7 },   // Card 2
        { tx: -5, ty: -50, rot: -2 },    // Card 3
        { tx: 10, ty: -70, rot: 5 },     // Card 4
        { tx: 25, ty: -55, rot: 10 },    // Card 5
        { tx: 45, ty: -72, rot: 18 }     // Card 6
      ];
    } else if (isTablet) {
      targets = [
        { tx: -150, ty: -160, rot: -18 },
        { tx: -75, ty: -220, rot: -8 },
        { tx: -20, ty: -140, rot: -2 },
        { tx: 30, ty: -200, rot: 6 },
        { tx: 85, ty: -150, rot: 12 },
        { tx: 150, ty: -210, rot: 20 }
      ];
    } else {
      targets = [
        { tx: -300, ty: -200, rot: -22 },
        { tx: -150, ty: -290, rot: -10 },
        { tx: -40, ty: -170, rot: -4 },
        { tx: 60, ty: -260, rot: 8 },
        { tx: 170, ty: -180, rot: 12 },
        { tx: 310, ty: -270, rot: 24 }
      ];
    }

    cameraPhotoCards.forEach((card, index) => {
      const target = targets[index];
      if (!target) return;

      // Slight stagger start for each card based on its index
      const startOffset = index * 0.05;
      const cardProgress = Math.max(0, Math.min(1, (progress - startOffset) / (1 - startOffset)));

      // Smooth easing (cubic out)
      const easeProgress = 1 - Math.pow(1 - cardProgress, 3);

      const currentTx = target.tx * easeProgress;
      let initialTy;
      if (isMobile) {
        const vw = window.innerWidth / 100;
        initialTy = 12 * vw;
      } else if (isTablet) {
        initialTy = 175;
      } else {
        initialTy = 150;
      }
      const currentTy = initialTy + (target.ty - initialTy) * easeProgress;
      const currentRot = target.rot * easeProgress;
      const currentScale = 0.15 + (1 - 0.15) * easeProgress;
      const currentOpacity = easeProgress;

      card.style.transform = `translate(${currentTx}px, ${currentTy}px) scale(${currentScale}) rotate(${currentRot}deg)`;
      card.style.opacity = currentOpacity;

      // Store current transforms as CSS variables for hover calculations
      card.style.setProperty('--hover-tx', `${currentTx}px`);
      card.style.setProperty('--hover-ty', `${currentTy}px`);

      if (cardProgress > 0.4) {
        card.style.pointerEvents = 'auto';
      } else {
        card.style.pointerEvents = 'none';
      }
    });
  };

  if (cameraSection) {
    window.addEventListener('scroll', updateCameraGallery, { passive: true });
    window.addEventListener('resize', updateCameraGallery, { passive: true });
    // Initial run to lay cards out
    setTimeout(updateCameraGallery, 200);
  }

  if (cameraPhotoCards.length > 0) {
    cameraPhotoCards.forEach((item) => {
      item.addEventListener('click', () => {
        const targetUrl = 'portfolio.html';
        const pageTransition = document.querySelector('.page-transition');
        if (pageTransition) {
          pageTransition.classList.remove('loaded');
          setTimeout(() => {
            window.location.href = targetUrl;
          }, 750);
        } else {
          window.location.href = targetUrl;
        }
      });

      // Hook up custom cursor hover states
      const cursor = document.querySelector('.custom-cursor');
      if (cursor) {
        item.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        item.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
      }
    });
  }

  // ─────────────── Back to Top ───────────────
  const backTop = document.getElementById('back-to-top');
  if (backTop) {
    backTop.addEventListener('click', (e) => {
      e.preventDefault();
      if (lenis) lenis.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─────────────── Smooth scroll anchors ───────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        const offsetVal = window.innerWidth > 1024 ? 0 : -70;
        if (lenis) lenis.scrollTo(target, { offset: offsetVal });
        else target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Push state so back button scrolls back to previous section/top
        history.pushState({ anchor: href }, '', href);
      }
    });
  });

  // ─────────────── Photo Wall Horizontal Scroll ───────────────
  const wallContainer = document.getElementById('photo-wall-container');
  const wallPrev = document.getElementById('wall-prev');
  const wallNext = document.getElementById('wall-next');

  if (wallContainer && wallPrev && wallNext) {
    wallPrev.addEventListener('click', () => {
      const scrollAmount = window.innerWidth * 0.8;
      wallContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    wallNext.addEventListener('click', () => {
      const scrollAmount = window.innerWidth * 0.8;
      wallContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Custom cursor support if available
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
      const addHover = () => cursor.classList.add('cursor-hover');
      const removeHover = () => cursor.classList.remove('cursor-hover');

      wallPrev.addEventListener('mouseenter', addHover);
      wallPrev.addEventListener('mouseleave', removeHover);
      wallNext.addEventListener('mouseenter', addHover);
      wallNext.addEventListener('mouseleave', removeHover);
    }
  }

  // ─────────────── Testimonials Marquee & Modal logic ───────────────
  const testimonialData = [
    {
      name: "Arohi & Animesh",
      role: "Wedding Couple",
      content: "Hi Prathamesh,\nFirst of all it was our luck that we found you. From day 1 you put such excellent efforts in the wedding and even planning and coordinating the entries, poses, which we will be cherishing forever.\n\nThank you for all your work, specially your patience & Professionalism during the wedding was top notch. All the Content photos, movies, reels and albums were more than what we expected\n\nThanks for creating life long memories for us.🥂✨",
      avatar: "assets/images/animesh_arohi.png",
      rating: 5,
      bgColor: "#241515" // Deep warm maroon/crimson matching photo
    },
    {
      name: "Harish & Rasika",
      role: "Wedding Couple",
      content: "Hi Prathamesh,\nI was in search of a passionate photographer — someone who would truly understand my expectations, meet them, and bring them to life in an amazing way. I was looking for someone who would not just listen to my requirements but also value them, and even suggest ways to enhance the ideas further.\n\nWhile shooting with you, both of us never felt like we were working with a typical photographer — it felt like we were shooting with a good friend. That comfort and connection helped you understand my vision even more clearly and execute it quickly and beautifully.\n\nAnd finally, now that the photos and videos are ready — they are absolutely awesome, man. Truly Loved it!\n\nHarish & Rasika",
      avatar: "assets/images/harish_rasika.png",
      rating: 5,
      bgColor: "#161b13" // Deep olive/sage green matching photo greenery
    },
    {
      name: "Shubham & Shibani",
      role: "Wedding Couple",
      content: "Hi Prathamesh & Team,\nHaving you capture our wedding was one of the best decisions—we felt so comfortable because it was you.\n\nThank you for all the hard work, dedication, and the love you put into the shoot.\n\nWe’re super excited to see everything!\nGrateful to have you as a friend too 😊✨",
      avatar: "assets/images/review_couple.jpg",
      rating: 5,
      bgColor: "#1e1b16" // Warm deep charcoal olive matching petal shower
    },
    {
      name: "Sanyukta & Rohan",
      role: "Wedding Couple",
      content: "I just wanted to say a huge thank you for the incredible work you did capturing our wedding day. I'm seriously in awww 🥰 at how beautifully you caught all the little candid moments, even the one we didn’t know happening\n\nThe quality and editing are stunning, and every shot feels so genuine and alive.\n\nBeyond the photo you guys were lovely to work with . So professional, calm, and easy-going( ignore few incidents )you made us feel completely at ease throughout the whole day.\n\nThese photos are something we'll treasure forever. ❤️\nLoved the photos\nLoved the video\nLoved the edits\n\nThank you Prathamesh & Team",
      avatar: "assets/images/sanyukta_rohan.jpg",
      rating: 5,
      bgColor: "#142018" // Deep emerald green matching saree & lush trees
    }
  ];

  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const testimonialModal = document.getElementById('testimonial-modal');
  const modalAvatar = document.getElementById('testimonial-modal-avatar');
  const modalName = document.getElementById('testimonial-modal-name');
  const modalRole = document.getElementById('testimonial-modal-role');
  const modalRating = document.getElementById('testimonial-modal-rating');
  const modalText = document.getElementById('testimonial-modal-text');
  const modalClose = document.getElementById('testimonial-modal-close');
  const modalOverlay = document.getElementById('testimonial-modal-overlay');

  if (testimonialCards.length > 0 && testimonialModal) {
    const openTestimonial = (index) => {
      const data = testimonialData[index];
      if (!data) return;

      modalAvatar.src = data.avatar;
      modalAvatar.alt = data.name;
      modalName.textContent = data.name;
      modalRole.textContent = data.role;
      modalText.textContent = data.content; // Premium editorial presentation without raw nested quotes

      // Split names for the editorial left/right vertical indicators
      let nameLeft = '';
      let nameRight = '';
      const nameStr = data.name || '';

      if (nameStr.includes('&')) {
        const parts = nameStr.split('&');
        nameLeft = parts[0].trim();
        nameRight = parts[1].trim();
      } else if (nameStr.toLowerCase().includes(' and ')) {
        const parts = nameStr.split(/ and /i);
        nameLeft = parts[0].trim();
        nameRight = parts[1].trim();
      } else {
        const parts = nameStr.split(' ');
        nameLeft = parts[0] || '';
        nameRight = parts.slice(1).join(' ') || 'Review';
      }

      const leftOvalName = document.getElementById('testimonial-oval-name-left');
      const rightOvalName = document.getElementById('testimonial-oval-name-right');
      if (leftOvalName) leftOvalName.textContent = nameLeft;
      if (rightOvalName) rightOvalName.textContent = nameRight;

      // Populate Watermarks dynamically
      const watermarksContainer = document.getElementById('testimonial-modal-watermarks');
      if (watermarksContainer) {
        watermarksContainer.innerHTML = '';

        // Left Watermark (letters of left name repeating)
        const leftCol = document.createElement('div');
        leftCol.className = 'watermark-column watermark-left';
        const leftLetters = nameLeft.toUpperCase().replace(/[^A-Z]/g, '').split('');
        let leftContent = '';
        if (leftLetters.length > 0) {
          for (let i = 0; i < 6; i++) {
            leftContent += `<span>${leftLetters[i % leftLetters.length]}</span>`;
          }
        }
        leftCol.innerHTML = leftContent;

        // Right Watermark (letters of right name repeating)
        const rightCol = document.createElement('div');
        rightCol.className = 'watermark-column watermark-right';
        const rightLetters = nameRight.toUpperCase().replace(/[^A-Z]/g, '').split('');
        let rightContent = '';
        if (rightLetters.length > 0) {
          for (let i = 0; i < 6; i++) {
            rightContent += `<span>${rightLetters[i % rightLetters.length]}</span>`;
          }
        }
        rightCol.innerHTML = rightContent;

        watermarksContainer.appendChild(leftCol);
        watermarksContainer.appendChild(rightCol);
      }

      // Fill stars
      modalRating.innerHTML = '';
      for (let i = 0; i < data.rating; i++) {
        const star = document.createElement('span');
        star.className = 'star';
        star.textContent = '★';
        modalRating.appendChild(star);
      }

      testimonialModal.style.backgroundColor = data.bgColor || '#070707';
      testimonialModal.classList.add('active');
      testimonialModal.scrollTop = 0;
      const modalContainer = testimonialModal.querySelector('.testimonial-modal-container');
      if (modalContainer) {
        modalContainer.scrollTop = 0;
      }
      document.body.style.overflow = 'hidden';
      if (typeof lenis !== 'undefined' && lenis) {
        lenis.stop();
      }

      // Push history state so back button closes testimonial modal
      history.pushState({ testimonialOpen: true }, '', '#testimonial');
    };

    const closeTestimonial = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (history.state && history.state.testimonialOpen) {
        history.back();
      } else {
        performCloseTestimonial();
      }
    };

    const performCloseTestimonial = () => {
      testimonialModal.classList.remove('active');
      document.body.style.overflow = '';
      if (typeof lenis !== 'undefined' && lenis) {
        lenis.start();
      }
      // Reset background color after close transition completes
      setTimeout(() => {
        testimonialModal.style.backgroundColor = '';
      }, 600);
    };

    window.performCloseTestimonial = performCloseTestimonial;

    testimonialCards.forEach(card => {
      card.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent click from bubbling up to testimonialModal listener
        const index = parseInt(card.getAttribute('data-index'));
        openTestimonial(index);
      });

      // Hook up custom cursor hover states
      if (cursor) {
        card.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        card.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
      }
    });

    // Tap anywhere on the modal to close the review preview
    testimonialModal.addEventListener('click', closeTestimonial);
    if (modalClose) modalClose.addEventListener('click', closeTestimonial);
    if (modalOverlay) modalOverlay.addEventListener('click', closeTestimonial);
  }

  // ─────────────── Featured Stories Slider ───────────────
  const storySlides = document.querySelectorAll('.story-slide');
  const storyPrev = document.getElementById('story-prev');
  const storyNext = document.getElementById('story-next');

  if (storySlides.length > 0 && storyPrev && storyNext) {
    let currentSlideIndex = 0;

    const showSlide = (index) => {
      storySlides.forEach((slide, idx) => {
        if (idx === index) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
    };

    storyPrev.addEventListener('click', () => {
      currentSlideIndex = (currentSlideIndex - 1 + storySlides.length) % storySlides.length;
      showSlide(currentSlideIndex);
    });

    storyNext.addEventListener('click', () => {
      currentSlideIndex = (currentSlideIndex + 1) % storySlides.length;
      showSlide(currentSlideIndex);
    });

    // Support for custom cursor if available
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
      const addHover = () => cursor.classList.add('cursor-hover');
      const removeHover = () => cursor.classList.remove('cursor-hover');

      storyPrev.addEventListener('mouseenter', addHover);
      storyPrev.addEventListener('mouseleave', removeHover);
      storyNext.addEventListener('mouseenter', addHover);
      storyNext.addEventListener('mouseleave', removeHover);

      const slideBtns = document.querySelectorAll('.story-btn');
      slideBtns.forEach(btn => {
        btn.addEventListener('mouseenter', addHover);
        btn.addEventListener('mouseleave', removeHover);
      });
    }
  }

  // ─────────────── Portfolio Page Stories Slider ───────────────
  const portfolioPrev = document.getElementById('portfolio-prev');
  const portfolioNext = document.getElementById('portfolio-next');
  const portfolioSlides = document.querySelectorAll('.portfolio-slider-section .story-slide');

  if (portfolioSlides.length > 0 && portfolioPrev && portfolioNext) {
    let currentPortfolioSlideIndex = 0;

    const showPortfolioSlide = (index) => {
      portfolioSlides.forEach((slide, idx) => {
        if (idx === index) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
    };

    portfolioPrev.addEventListener('click', () => {
      currentPortfolioSlideIndex = (currentPortfolioSlideIndex - 1 + portfolioSlides.length) % portfolioSlides.length;
      showPortfolioSlide(currentPortfolioSlideIndex);
    });

    portfolioNext.addEventListener('click', () => {
      currentPortfolioSlideIndex = (currentPortfolioSlideIndex + 1) % portfolioSlides.length;
      showPortfolioSlide(currentPortfolioSlideIndex);
    });

    // Support for custom cursor if available
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
      const addHover = () => cursor.classList.add('cursor-hover');
      const removeHover = () => cursor.classList.remove('cursor-hover');

      portfolioPrev.addEventListener('mouseenter', addHover);
      portfolioPrev.addEventListener('mouseleave', removeHover);
      portfolioNext.addEventListener('mouseenter', addHover);
      portfolioNext.addEventListener('mouseleave', removeHover);
    }
  }

  // Explore Gallery buttons on the new portfolio grid - Open in dynamic gallery page
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  portfolioCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Prevent navigation redirect if clicking engagement buttons/elements
      if (e.target.closest('.story-comments-toggle') || e.target.closest('.story-entry-likes') || e.target.closest('.story-comments-drawer')) {
        return;
      }
      if (card.classList.contains('story-coming-soon')) {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      const folder = card.getAttribute('data-folder') || 'folder_1';
      const title = card.getAttribute('data-title') || 'Featured Gallery';
      const imagesStr = card.getAttribute('data-gallery-images') || '';

      // Save images list in sessionStorage as a local fallback
      sessionStorage.setItem('current_gallery_images', imagesStr);

      const targetUrl = `gallery.html?folder=${folder}&title=${encodeURIComponent(title)}`;
      const pageTransition = document.querySelector('.page-transition');
      if (pageTransition) {
        pageTransition.classList.remove('loaded');
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 750);
      } else {
        window.location.href = targetUrl;
      }
    });
  });




  // Story Cards: Staggered scroll-reveal for new stories feed
  const storyCards = document.querySelectorAll('.story-entry');
  if (storyCards.length > 0) {
    const storyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          storyObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    storyCards.forEach(card => storyObserver.observe(card));
  }

  // ─────────────── Dedicated Gallery Page Dynamic Loading ───────────────
  const galleryPageGrid = document.getElementById('gallery-page-grid');
  if (galleryPageGrid) {
    const urlParams = new URLSearchParams(window.location.search);
    const folder = urlParams.get('folder') || 'folder_1';

    const rawTitle = urlParams.get('title') || 'Featured Gallery';

    const galleryMeta = {
      'folder_1': {
        title: 'Rishi and Suprima',
        description: 'Where Himalayan elegance meets Maharashtrian heritage. This wedding felt like a royal fairytale dreamy, graceful, and timeless. The couple carried the aura of celebrities, wrapped in tradition and luxury. A cinematic celebration of love, culture, and unforgettable moments.'
      },
      'folder_2': {
        title: 'Saurabh & Ashwini',
        description: 'A celebration of love rooted in tradition and the vibrant spirit of Mumbai. Saurabh and Ashwini\'s wedding was a beautiful blend of heartfelt moments, joyous festivities, and timeless elegance. Every frame tells a story of two souls destined to be together.'
      },
      'folder_3': {
        title: 'Manisha & Christopher',
        description: 'An evening of love, style and blend of two cultures in the heart of Singapore. The celebration was a beautiful testament to their journey, merging distinct traditions into a seamless and heartfelt union in the stunning city-state.'
      },
      'folder_4': {
        title: 'Alia & Ranbir, Mumbai',
        description: 'Two of the greatest actors of this generation decided to get married in the simplest possible way - in their balcony surrounded by only 30 of their closest friends and family members. We spent three days in their Apartment and witnessed love in its purest form.'
      },
      'folder_5': {
        title: 'Aishwarya & Shankar',
        description: 'A beautiful and vibrant wedding celebration filled with authentic emotions, laughter, and timeless memories. Every moment captured represents the beginning of a beautiful lifelong journey together.'
      },
      'folder_6': {
        title: 'Sujoy & Abhilasha',
        description: 'A soulful, traditional South Indian wedding celebrating the beautiful union of Sujoy and Abhilasha, filled with sacred rituals, music of the nadaswaram, and the blessings of family.'
      },
      'folder_7': {
        title: 'Shreyash & Sakshi',
        description: 'A grand celebration of love, culture, and timeless memories set against the majestic heritage palaces of Udaipur.'
      },
      'folder_8': {
        title: 'Rohan & Tejashree',
        description: 'A vibrant and joyful celebration of love, tradition, and togetherness — capturing every heartfelt moment of Rohan and Tejashree\'s beautiful wedding journey.'
      }
    };

    const meta = galleryMeta[folder] || { title: rawTitle, description: '' };

    // Update document title
    document.title = `${meta.title} — ForeShadow`;

    // Dynamic hero background cover painting matching the folder
    const paintings = {
      'folder_1': 'paintings/rushi_suprima_painting.jpg',
      'folder_2': 'paintings/saurabh_ashwini_painting.png',
      'folder_3': 'paintings/singapore_painting.png',
      'folder_4': 'paintings/mumbai_painting.png',
      'folder_5': 'paintings/aishwarya_shankar_painting.jpg',
      'folder_6': 'paintings/sujoy_abhilasha_painting.jpg',
      'folder_7': 'assets/images/shreyash_sakshi.jpg',
      'folder_8': 'assets/images/rohan_tejashree.jpg'
    };
    const heroImageEl = document.getElementById('gallery-hero-image');
    if (heroImageEl) {
      heroImageEl.src = paintings[folder] || paintings['folder_1'];
      heroImageEl.setAttribute('fetchpriority', 'high'); // Prioritize hero image loading
    }

    const heroTitleEl = document.getElementById('gallery-hero-title');
    if (heroTitleEl) {
      heroTitleEl.textContent = meta.title;
    }

    const heroTextEl = document.querySelector('.gallery-page-hero-text');
    if (heroTextEl) {
      if (folder === 'folder_5') {
        heroTextEl.style.display = 'none';
      } else {
        heroTextEl.style.display = '';
      }
    }

    const descEl = document.getElementById('gallery-page-desc');
    if (descEl) descEl.textContent = meta.description;

    const countEl = document.getElementById('gallery-page-count'); // fallback/hidden element
    const heroCountEl = document.getElementById('gallery-hero-count');
    const loadingEl = document.getElementById('gallery-page-loading');

    // Smooth scroll from hero scroll button to intro section
    const scrollBtn = document.getElementById('gallery-hero-scroll-btn');
    if (scrollBtn) {
      scrollBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const introSection = document.getElementById('gallery-intro-section');
        if (introSection) {
          introSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Floating Exit Gallery Button scroll toggle
    const floatingExitBtn = document.getElementById('floating-gallery-exit');
    if (floatingExitBtn) {
      const toggleFloatingExit = () => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollY > window.innerHeight * 0.5) {
          floatingExitBtn.classList.add('visible');
        } else {
          floatingExitBtn.classList.remove('visible');
        }
      };
      window.addEventListener('scroll', toggleFloatingExit, { passive: true });
      toggleFloatingExit();
    }

    // ─────────────── Gallery Engagement (Comments & Likes) ───────────────
    const initGalleryEngagement = async (folder) => {
      const commentsCountEl = document.getElementById('gallery-comments-count');
      const likesContainerEl = document.getElementById('gallery-likes-container');
      const likesCountEl = document.getElementById('gallery-likes-count');

      if (!commentsCountEl || !likesContainerEl || !likesCountEl) return;

      // ─────────────── Working Comments Board ───────────────
      const commentsListEl = document.getElementById('comments-list');
      const commentFormEl = document.getElementById('comment-submit-form');
      const commentAuthorName = document.getElementById('comment-author-name');
      const commentText = document.getElementById('comment-text');

      // Load comments from localStorage (starts fresh/empty)
      let comments = [];
      try {
        const stored = localStorage.getItem(`comments_${folder}`);
        if (stored) {
          comments = JSON.parse(stored);
        }
      } catch (err) {
        comments = [];
      }

      const renderComments = () => {
        if (!commentsListEl) return;
        commentsListEl.innerHTML = '';
        comments.forEach((comment) => {
          const item = document.createElement('div');
          item.className = 'comment-item';

          const initial = comment.name ? comment.name.charAt(0) : '?';

          item.innerHTML = `
            <div class="comment-avatar">${initial}</div>
            <div class="comment-content">
              <div class="comment-header">
                <span class="comment-author">${comment.name}</span>
                <span class="comment-date">${comment.date}</span>
              </div>
              <p class="comment-body">${comment.text}</p>
            </div>
          `;
          commentsListEl.appendChild(item);
        });

        // Update count label in meta-row
        if (commentsCountEl) {
          commentsCountEl.textContent = `${comments.length} Comments`;
        }
      };

      renderComments();

      // Submit listener
      if (commentFormEl) {
        commentFormEl.addEventListener('submit', (e) => {
          e.preventDefault();
          const name = commentAuthorName.value.trim();
          const text = commentText.value.trim();
          if (!name || !text) return;

          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          const formattedDate = new Date().toLocaleDateString('en-US', options);

          const newComment = {
            name: name,
            date: formattedDate,
            text: text
          };

          comments.push(newComment);

          try {
            localStorage.setItem(`comments_${folder}`, JSON.stringify(comments));
          } catch (err) { console.warn(err); }

          renderComments();

          // Reset form
          commentFormEl.reset();
        });
      }

      // Check if user has liked this story before
      let hasLiked = false;
      try {
        hasLiked = localStorage.getItem(`like_${folder}`) === 'true';
      } catch (e) { console.warn(e); }

      if (hasLiked) {
        likesContainerEl.classList.add('liked');
      }

      const namespace = 'foreshadow-likes-v4';
      const key = `story-${folder}`;

      const updateUI = (count) => {
        likesCountEl.textContent = `${Number(count).toLocaleString()} Likes`;
      };

      // Fetch likes count from API
      try {
        const res = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}`);
        if (res.ok) {
          const data = await res.json();
          updateUI(data.count);
        } else {
          // Initialize key to 0
          const initRes = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`);
          if (initRes.ok) {
            const initData = await initRes.json();
            const downRes = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/down`);
            if (downRes.ok) {
              const downData = await downRes.json();
              updateUI(downData.count);
            } else {
              updateUI(0);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching gallery likes:', err);
      }

      // Add click listener
      likesContainerEl.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();

        let currentText = likesCountEl.textContent;
        let currentNum = parseInt(currentText) || 0;

        if (hasLiked) {
          // Unlike behavior
          hasLiked = false;
          likesContainerEl.classList.remove('liked');
          try {
            localStorage.setItem(`like_${folder}`, 'false');
          } catch (err) { console.warn(err); }

          updateUI(Math.max(0, currentNum - 1));

          try {
            const res = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/down`);
            if (res.ok) {
              const data = await res.json();
              updateUI(data.count);
            }
          } catch (err) {
            console.error('Error decrementing gallery likes:', err);
          }
        } else {
          // Like behavior
          hasLiked = true;
          likesContainerEl.classList.add('liked');
          try {
            localStorage.setItem(`like_${folder}`, 'true');
          } catch (err) { console.warn(err); }

          updateUI(currentNum + 1);

          try {
            const res = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`);
            if (res.ok) {
              const data = await res.json();
              updateUI(data.count);
            }
          } catch (err) {
            console.error('Error incrementing gallery likes:', err);
          }
        }
      });
    };
    initGalleryEngagement(folder);

    // Next Story button routing
    const nextStoryBtn = document.getElementById('next-story-btn');
    if (nextStoryBtn) {
      const folderOrder = ['folder_1', 'folder_6', 'folder_5', 'folder_2', 'folder_7', 'folder_8'];
      const currentFolder = folder;
      const currentIndex = folderOrder.indexOf(currentFolder);
      if (currentIndex !== -1) {
        const nextIndex = (currentIndex + 1) % folderOrder.length;
        const nextFolder = folderOrder[nextIndex];

        const nextMeta = galleryMeta[nextFolder] || { title: 'Next Story' };
        nextStoryBtn.href = `gallery.html?folder=${nextFolder}&title=${encodeURIComponent(nextMeta.title)}`;
      } else {
        nextStoryBtn.href = 'portfolio.html';
      }
    }

    // Static local image fallback list for each folder references global STATIC_GALLERY_FALLBACKS
    const staticFallbacks = STATIC_GALLERY_FALLBACKS;

    // Retrieve fallback images from sessionStorage or default to static fallbacks
    const localImagesStr = sessionStorage.getItem('current_gallery_images');
    const localImages = localImagesStr ? localImagesStr.split(',').map(s => s.trim()).filter(s => s.length > 0) : (staticFallbacks[folder] || []);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Dimensions lookup caches
    let galleryObserver;
    let currentColsCount = 0;
    let resizeListener = null;

    const renderGallery = (images) => {
      const reversedImages = [...images].reverse();
      if (reversedImages.length === 0) {
        if (loadingEl) loadingEl.textContent = 'No photos found in this gallery.';
        return;
      }

      if (countEl) countEl.textContent = `${reversedImages.length} Photos`;
      if (heroCountEl) heroCountEl.textContent = `${reversedImages.length} Photos`;

      if (loadingEl) {
        loadingEl.style.display = 'none';
      }

      // Disconnect previous global observer if any
      if (galleryObserver) {
        galleryObserver.disconnect();
      }

      // Upgrade image src to full resolution when near viewport
      const upgradeToFullRes = (img, fullUrl) => {
        if (!img || img.getAttribute('data-upgraded') === 'true') return;
        img.setAttribute('data-upgraded', 'true');
        const highRes = new Image();
        highRes.onload = () => {
          img.src = fullUrl;
        };
        highRes.src = fullUrl;
      };

      // Set up global observer for reveal animation + smart high-res preloading
      if (!prefersReducedMotion) {
        galleryObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const item = entry.target;
              item.classList.add('gallery-item-revealed');
              const img = item.querySelector('img');
              const fullUrl = item.getAttribute('data-full-url');
              if (img && fullUrl) {
                upgradeToFullRes(img, fullUrl);
              }
              galleryObserver.unobserve(item);
            }
          });
        }, { threshold: 0.01, rootMargin: '800px 0px 800px 0px' });
      }

      const createGalleryItem = (url, index, allImages) => {
        const item = document.createElement('div');
        item.className = 'gallery-page-item-new';
        item.setAttribute('data-index', index);
        item.style.zIndex = index + 1;
        item.style.cursor = 'default'; // Not clickable - display only

        const fullUrl = url.trim().replace(/\.md\.(jpg|png|jpeg|webp)$/i, '.$1');
        item.setAttribute('data-full-url', fullUrl);

        const img = document.createElement('img');
        img.alt = `${meta.title} - Photo ${index + 1}`;
        img.decoding = 'async';

        // Load full resolution immediately for first 4 images (above the fold)
        // Load fast medium thumbnail for remaining images, upgrading 800px before scroll
        if (index < 4) {
          img.src = fullUrl;
          img.setAttribute('data-upgraded', 'true');
          img.loading = 'eager';
        } else {
          img.src = url;
          img.loading = 'lazy';
        }

        item.appendChild(img);

        if (galleryObserver) {
          galleryObserver.observe(item);
        } else {
          item.classList.add('gallery-item-revealed');
          if (index >= 4) upgradeToFullRes(img, fullUrl);
        }

        return item;
      };

      // Reset currentColsCount to force redistribution for new gallery loads
      currentColsCount = 0;

      const distributeItems = () => {
        const isMobile = window.innerWidth <= 768 || document.documentElement.classList.contains('is-mobile');

        if (folder === 'folder_5' || folder === 'folder_2' || folder === 'folder_7' || folder === 'folder_8') {
          // Naman Verma Stacked Gallery Layout
          // Rule: Landscape images → full-width single row
          //       Portrait images → paired 2 per row
          galleryPageGrid.classList.add('gallery-naman-style');
          galleryPageGrid.classList.remove('gallery-behance-style');
          if (galleryPageGrid.children.length > 0 && currentColsCount === 1) return;
          currentColsCount = 1;

          galleryPageGrid.innerHTML = '';

          // Orientation lookup using GALLERY_DIMENSIONS
          // true = landscape (wider), false = portrait (taller)
          const isLandscape = (imgUrl) => {
            if (window.GALLERY_DIMENSIONS && window.GALLERY_DIMENSIONS[imgUrl] !== undefined) {
              return window.GALLERY_DIMENSIONS[imgUrl];
            }
            return true; // default to landscape
          };

          // Separate landscapes and portraits
          const landscapes = [];
          const portraits = [];
          reversedImages.forEach((imgUrl) => {
            if (isLandscape(imgUrl)) {
              landscapes.push(imgUrl);
            } else {
              portraits.push(imgUrl);
            }
          });

          // Interleave: 1 Landscape followed by up to 2 rows of 9:16 portraits (2 portraits per row)
          const rows = [];
          let L_idx = 0;
          let P_idx = 0;

          while (L_idx < landscapes.length || P_idx < portraits.length) {
            // 1. Add 1 Landscape photo (full-width row)
            if (L_idx < landscapes.length) {
              rows.push({ images: [landscapes[L_idx]] });
              L_idx++;
            }

            // 2. Add up to 2 rows of paired portraits
            for (let r = 0; r < 2; r++) {
              if (P_idx < portraits.length) {
                const rowImages = [];
                rowImages.push(portraits[P_idx]);
                P_idx++;
                if (P_idx < portraits.length) {
                  rowImages.push(portraits[P_idx]);
                  P_idx++;
                }
                rows.push({ images: rowImages });
              }
            }
          }

          // Build a single flat array of interleaved images for correct lightbox index reference and prevent duplicates
          const interleavedImages = [];
          rows.forEach((r) => {
            r.images.forEach((img) => {
              interleavedImages.push(img);
            });
          });

          // Render rows
          let globalIdx = 0;
          rows.forEach((rowConfig) => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'gallery-row';
            galleryPageGrid.appendChild(rowDiv);

            rowConfig.images.forEach((imgUrl) => {
              const item = createGalleryItem(imgUrl, globalIdx, interleavedImages);
              item.setAttribute('data-orientation', isLandscape(imgUrl) ? 'landscape' : 'portrait');
              rowDiv.appendChild(item);
              globalIdx++;
            });
          });
        } else {
          // Standard Column Masonry layout for other folders
          galleryPageGrid.classList.remove('gallery-naman-style');
          galleryPageGrid.classList.remove('gallery-behance-style');

          let colsCount = 4;
          if (isMobile) {
            colsCount = 2;
          } else if (folder === 'folder_6') {
            colsCount = 3;
          } else if (window.innerWidth <= 1024) {
            colsCount = 3;
          }

          if (colsCount === currentColsCount) return;
          currentColsCount = colsCount;

          galleryPageGrid.innerHTML = '';
          const colDivs = [];
          for (let i = 0; i < colsCount; i++) {
            const col = document.createElement('div');
            col.className = 'gallery-col';
            galleryPageGrid.appendChild(col);
            colDivs.push(col);
          }

          reversedImages.forEach((imgUrl, index) => {
            const colIdx = index % colsCount;
            const item = createGalleryItem(imgUrl, index, reversedImages);
            colDivs[colIdx].appendChild(item);
          });
        }
      };

      distributeItems();

      // Clean up previous window resize listener if any to prevent memory leaks/duplicate distributions
      if (resizeListener) {
        window.removeEventListener('resize', resizeListener);
      }
      resizeListener = distributeItems;
      window.addEventListener('resize', resizeListener);
    };
    // Render local/cached images immediately for instantaneous response
    if (localImages.length > 0) {
      renderGallery(localImages);
    }

    // Then, attempt to fetch fresh dynamic images in the background
    fetch(`${apiBase}/api/gallery/${folder}`)
      .then(res => res.ok ? res.json() : { success: false })
      .catch(() => ({ success: false }))
      .then((data) => {
        if (data.success && data.images && data.images.length > 0) {
          const localString = localImages.join(',');
          const apiString = data.images.join(',');
          if (localString !== apiString) {
            renderGallery(data.images);
          }
        }
      })
      .catch(err => {
        console.warn('API fetch failed, keeping local gallery list:', err);
      });
  }

  // Scroll expansion animation logic removed as requested for static layout

  // Films Category Filter removed as page has been redesigned to use minimal stacked layout without filters



  // ─────────────── Stories Genuine Liking System ───────────────
  const initStoriesLikes = () => {
    const likeContainers = document.querySelectorAll('.story-entry-likes');
    if (likeContainers.length === 0) return;

    likeContainers.forEach(async (container) => {
      const article = container.closest('.story-entry');
      if (!article) return;
      const folder = article.getAttribute('data-folder');
      if (!folder) return;

      const likesCountSpan = container.querySelector('.likes-count');

      // Helper function to render comments inside the drawer
      const renderStoryComments = (folder, listEl, countEl) => {
        if (!listEl) return;
        listEl.innerHTML = '';

        let comments = [];
        try {
          const stored = localStorage.getItem(`comments_${folder}`);
          if (stored) {
            comments = JSON.parse(stored);
          }
        } catch (err) {
          comments = [];
        }

        // Update count label in meta-row
        if (countEl) {
          const countTextSpan = countEl.querySelector('.comments-count-text');
          if (countTextSpan) {
            countTextSpan.textContent = `${comments.length} Comments`;
          } else {
            countEl.textContent = `${comments.length} Comments`;
          }
        }

        if (comments.length === 0) {
          listEl.innerHTML = '<div class="story-no-comments">No comments yet. Be the first to share your thoughts!</div>';
          return;
        }

        comments.forEach((comment) => {
          const item = document.createElement('div');
          item.className = 'story-comment-item';
          const initial = comment.name ? comment.name.charAt(0) : '?';

          item.innerHTML = `
            <div class="story-comment-avatar">${initial}</div>
            <div class="story-comment-content">
              <div class="story-comment-header">
                <span class="story-comment-author">${comment.name}</span>
                <span class="story-comment-date">${comment.date}</span>
              </div>
              <p class="story-comment-body">${comment.text}</p>
            </div>
          `;
          listEl.appendChild(item);
        });
      };

      // Dynamic comments count on story feed card
      const commentsSpan = article.querySelector('.story-entry-comments');
      if (commentsSpan) {
        let commentsCount = 0;
        try {
          const stored = localStorage.getItem(`comments_${folder}`);
          if (stored) {
            commentsCount = JSON.parse(stored).length;
          }
        } catch (err) { console.warn(err); }

        const countTextSpan = commentsSpan.querySelector('.comments-count-text');
        if (countTextSpan) {
          countTextSpan.textContent = `${commentsCount} Comments`;
        } else {
          commentsSpan.textContent = `${commentsCount} Comments`;
        }
      }

      // Initialize accordion comments drawer
      const commentsToggle = article.querySelector('.story-comments-toggle');
      const commentsDrawer = article.querySelector('.story-comments-drawer');
      const commentsList = article.querySelector('.story-comments-list');
      const commentForm = article.querySelector('.story-comment-form');

      if (commentsToggle && commentsDrawer) {
        commentsToggle.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation(); // Prevent redirecting to the gallery detail page

          const isCollapsed = commentsDrawer.style.display === 'none';
          if (isCollapsed) {
            // Load and render comments
            renderStoryComments(folder, commentsList, commentsSpan);
            commentsDrawer.style.display = 'block';
          } else {
            commentsDrawer.style.display = 'none';
          }

          // Recalculate Lenis scroll dimensions
          if (typeof lenis !== 'undefined' && lenis) {
            setTimeout(() => {
              lenis.resize();
            }, 100);
          }
        });
      }

      // Submit listener for comment form inside Story Card
      if (commentForm) {
        // Prevent clicking inside form inputs/button from triggering card redirect
        commentForm.addEventListener('click', (e) => {
          e.stopPropagation();
        });

        commentForm.addEventListener('submit', (e) => {
          e.preventDefault();
          e.stopPropagation();

          const nameEl = commentForm.querySelector('.story-comment-name');
          const textEl = commentForm.querySelector('.story-comment-text');

          const name = nameEl.value.trim();
          const text = textEl.value.trim();
          if (!name || !text) return;

          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          const formattedDate = new Date().toLocaleDateString('en-US', options);

          const newComment = {
            name: name,
            date: formattedDate,
            text: text
          };

          let comments = [];
          try {
            const stored = localStorage.getItem(`comments_${folder}`);
            if (stored) {
              comments = JSON.parse(stored);
            }
          } catch (err) { comments = []; }

          comments.push(newComment);

          try {
            localStorage.setItem(`comments_${folder}`, JSON.stringify(comments));
          } catch (err) { console.warn(err); }

          // Re-render
          renderStoryComments(folder, commentsList, commentsSpan);

          // Reset form fields
          commentForm.reset();

          // Scroll to the bottom of the comments list to show the new comment
          setTimeout(() => {
            if (commentsList) {
              commentsList.scrollTop = commentsList.scrollHeight;
            }
            if (typeof lenis !== 'undefined' && lenis) {
              lenis.resize();
            }
          }, 50);
        });
      }

      let hasLiked = false;
      try {
        hasLiked = localStorage.getItem(`like_${folder}`) === 'true';
      } catch (e) { console.warn(e); }

      if (hasLiked) {
        container.classList.add('liked');
      }

      const namespace = 'foreshadow-likes-v4';
      const key = `story-${folder}`;

      const updateUI = (count) => {
        if (likesCountSpan) {
          likesCountSpan.textContent = `${Number(count).toLocaleString()} Likes`;
        }
      };

      // Fetch current count from API
      try {
        const res = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}`);
        if (res.ok) {
          const data = await res.json();
          updateUI(data.count);
        } else {
          // Initialize key to 0
          const initRes = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`);
          if (initRes.ok) {
            const initData = await initRes.json();
            // Down to compensate initial increase, leaving it at 0 initially if first time
            const downRes = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/down`);
            if (downRes.ok) {
              const downData = await downRes.json();
              updateUI(downData.count);
            } else {
              updateUI(0);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching likes:', err);
      }

      // Click listener
      container.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent redirecting to the gallery detail page

        let currentText = likesCountSpan ? likesCountSpan.textContent : "0";
        let currentNum = parseInt(currentText) || 0;

        if (hasLiked) {
          // Unlike behavior
          hasLiked = false;
          container.classList.remove('liked');
          try {
            localStorage.setItem(`like_${folder}`, 'false');
          } catch (err) { console.warn(err); }

          updateUI(Math.max(0, currentNum - 1));

          try {
            const res = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/down`);
            if (res.ok) {
              const data = await res.json();
              updateUI(data.count);
            }
          } catch (err) {
            console.error('Error decrementing likes:', err);
          }
        } else {
          // Like behavior
          hasLiked = true;
          container.classList.add('liked');
          try {
            localStorage.setItem(`like_${folder}`, 'true');
          } catch (err) { console.warn(err); }

          updateUI(currentNum + 1);

          try {
            const res = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`);
            if (res.ok) {
              const data = await res.json();
              updateUI(data.count);
            }
          } catch (err) {
            console.error('Error incrementing likes:', err);
          }
        }
      });
    });
  };
  initStoriesLikes();

  // ─────────────── Smart Background Gallery Preloader ───────────────
  const initGalleryPreloader = () => {
    const preloadImage = (url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = img.onerror = () => resolve(url);
        // Translate to high resolution URL to preload the actual loaded image
        const fullUrl = url.trim().replace(/\.md\.(jpg|png|jpeg|webp)$/i, '.$1');
        img.src = fullUrl;
      });
    };

    const preloadQueue = async (urls, delayMs = 150) => {
      for (const url of urls) {
        if (!url) continue;
        await preloadImage(url);
        await new Promise(r => setTimeout(r, delayMs));
      }
    };

    // A. Idle preloading: load the first 8 displayed images of each gallery 3.5s after page load
    setTimeout(() => {
      const initialImagesToPreload = [];
      const folders = ['folder_1', 'folder_6', 'folder_2', 'folder_3', 'folder_4'];

      folders.forEach(folder => {
        const images = STATIC_GALLERY_FALLBACKS[folder] || [];
        const reversed = [...images].reverse();
        initialImagesToPreload.push(...reversed.slice(0, 8));
      });

      const uniquePreloads = [...new Set(initialImagesToPreload)];
      preloadQueue(uniquePreloads, 150);
    }, 3500);

    // B. Hover / Touch preloading on portfolio cards
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
      const startPreloadingCard = () => {
        const imagesStr = card.getAttribute('data-gallery-images') || '';
        const folder = card.getAttribute('data-folder');
        const fallbackList = STATIC_GALLERY_FALLBACKS[folder] || [];

        let urlsToPreload = [];
        if (imagesStr) {
          urlsToPreload = imagesStr.split(',').map(s => s.trim()).filter(s => s.length > 0).reverse();
        } else {
          urlsToPreload = [...fallbackList].reverse();
        }

        preloadQueue(urlsToPreload, 100);
      };

      card.addEventListener('mouseenter', startPreloadingCard, { once: true });
      card.addEventListener('touchstart', startPreloadingCard, { once: true });
    });
  };
  initGalleryPreloader();

  // ─────────────── Aesthetic Slider (Play the Novel Style) ───────────────
  const initAestheticSlider = () => {
    const track = document.getElementById('aesthetic-slider-track');
    const prevBtn = document.getElementById('aesthetic-prev');
    const nextBtn = document.getElementById('aesthetic-next');

    if (!track) return;

    // A. Arrow Navigation
    const getScrollAmount = () => {
      const firstSlide = track.querySelector('.aesthetic-slide');
      if (firstSlide) {
        const slideWidth = firstSlide.offsetWidth;
        const gap = parseInt(window.getComputedStyle(track).gap) || 24;
        return slideWidth + gap;
      }
      return 350;
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
      });
    }

    // B. Manage Arrow Visibility
    const updateArrows = () => {
      if (!prevBtn || !nextBtn) return;
      const scrollLeft = track.scrollLeft;
      const maxScroll = track.scrollWidth - track.clientWidth;

      if (scrollLeft <= 5) {
        prevBtn.classList.add('hidden');
      } else {
        prevBtn.classList.remove('hidden');
      }

      if (scrollLeft >= maxScroll - 5) {
        nextBtn.classList.add('hidden');
      } else {
        nextBtn.classList.remove('hidden');
      }
    };

    track.addEventListener('scroll', updateArrows, { passive: true });

    // Initial check
    setTimeout(updateArrows, 100);
    window.addEventListener('resize', updateArrows, { passive: true });

    // C. Grab-to-drag Mouse Scrolling on Desktop
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      track.classList.add('grabbing');
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => {
      isDown = false;
      track.classList.remove('grabbing');
    });

    track.addEventListener('mouseup', () => {
      isDown = false;
      track.classList.remove('grabbing');
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeft - walk;
    });
  };
  initAestheticSlider();

  // ─────────────── Scroll Heart Line Drawing Animation ───────────────
  const initFilmStripScroll = () => {
    const filmStrip = document.querySelector('.dar_pictures-container-2');
    if (filmStrip) {
      filmStrip.addEventListener('wheel', (e) => {
        // Prevent the default vertical scroll
        e.preventDefault();

        // Scroll the container horizontally instead
        // deltaY will be positive for scrolling down/right, negative for up/left
        filmStrip.scrollLeft += e.deltaY;
      }, { passive: false });
    }
  };

  // Only initialize this on the about page
  if (document.querySelector('.dar_zenit-camera')) {
    initFilmStripScroll();
  }

  const initScrollHeartLine = () => {
    const section = document.getElementById('scroll-heart-line');
    const pathLeft = document.querySelector('.scroll-heart-line-path.left-path');
    const pathRight = document.querySelector('.scroll-heart-line-path.right-path');

    if (!section || !pathLeft || !pathRight) return;

    // Set initial dash attributes for both paths
    const lengthLeft = pathLeft.getTotalLength();
    const lengthRight = pathRight.getTotalLength();

    pathLeft.style.strokeDasharray = lengthLeft;
    pathLeft.style.strokeDashoffset = lengthLeft;

    pathRight.style.strokeDasharray = lengthRight;
    pathRight.style.strokeDashoffset = lengthRight;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewHeight = window.innerHeight;

      // Animation starts when the section's top is at 90% viewport height
      // and completes when the section's top is at 25% viewport height
      const startScroll = viewHeight * 0.90;
      const endScroll = viewHeight * 0.25;

      const totalScroll = startScroll - endScroll;
      const currentScroll = startScroll - rect.top;

      let progress = currentScroll / totalScroll;
      progress = Math.max(0, Math.min(1, progress));

      // Update stroke dashoffset
      pathLeft.style.strokeDashoffset = lengthLeft * (1 - progress);
      pathRight.style.strokeDashoffset = lengthRight * (1 - progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => {
      const newLenLeft = pathLeft.getTotalLength();
      const newLenRight = pathRight.getTotalLength();
      pathLeft.style.strokeDasharray = newLenLeft;
      pathRight.style.strokeDasharray = newLenRight;
      handleScroll();
    }, { passive: true });

    // Initial check
    setTimeout(handleScroll, 100);
  };
  initScrollHeartLine();

  // ─────────────── Website Security System ───────────────
  const initSecuritySystem = () => {
    // Create security toast element
    const toast = document.createElement('div');
    toast.className = 'security-toast';
    toast.textContent = '© ForeShadow — Content & Images Protected';
    document.body.appendChild(toast);

    let toastTimeout;
    const showSecurityToast = () => {
      clearTimeout(toastTimeout);
      toast.classList.add('show');
      toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
      }, 2000);
    };

    // 1. Prevent Right-Click context menu
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      showSecurityToast();
    });

    // 2. Prevent dragging on all images
    document.addEventListener('dragstart', (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
        showSecurityToast();
      }
    });

    // 3. Block Developer Tools & Source viewing shortcuts
    document.addEventListener('keydown', (e) => {
      // F12 (123)
      if (e.keyCode === 123) {
        e.preventDefault();
        showSecurityToast();
        return false;
      }
      // Ctrl + Shift + I (Inspect), Ctrl + Shift + J (Console), Ctrl + Shift + C (Element selector)
      if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
        e.preventDefault();
        showSecurityToast();
        return false;
      }
      // Ctrl + U (View Source)
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        showSecurityToast();
        return false;
      }
      // Ctrl + S (Save Page)
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        showSecurityToast();
        return false;
      }
    });
  };
  initSecuritySystem();

  // Hide Webflow timeline floating elements (exit button and arrow) when footer is visible
  const footerEl = document.querySelector('.custom-footer');
  const darExit = document.querySelector('.dar_exit');
  const darArrow = document.querySelector('.dar-arrow');

  if (footerEl && (darExit || darArrow)) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (darExit) {
            darExit.style.opacity = '0';
            darExit.style.pointerEvents = 'none';
          }
          if (darArrow) {
            darArrow.style.opacity = '0';
            darArrow.style.pointerEvents = 'none';
          }
        } else {
          if (darExit) {
            darExit.style.opacity = '1';
            darExit.style.pointerEvents = 'auto';
          }
          if (darArrow) {
            darArrow.style.opacity = '1';
            darArrow.style.pointerEvents = 'auto';
          }
        }
      });
    }, { threshold: 0.01, rootMargin: '0px 0px -50px 0px' });
    observer.observe(footerEl);
  }

  // Interactive Footer Video Playlist Controls
  const initFooterControls = () => {
    const footerControls = document.querySelector('.custom-footer-controls');
    if (!footerControls) return;

    const playPauseBtn = footerControls.querySelector('.play-pause-btn');
    const prevBtn = footerControls.querySelector('.prev-btn');
    const nextBtn = footerControls.querySelector('.next-btn');
    const footerIframe = document.querySelector('.custom-footer-video-bg iframe');

    if (!footerIframe) return;

    // YouTube playlist array of video IDs
    const playlist = [
      'lQDGmkPki8Q', // Shubham & Shibani Sangeet
      'PSAEz3Xyrvg', // Home Hero Video
      'Nd7c--y9vYc', // Rishi & Suprima
      'SiMcwypL3Zo', // Shubham & Shibani Wedding Film
      'PIVGEnlq7AA'  // Parag & Nora
    ];

    // Retrieve index from sessionStorage or fallback to 0
    let currentIdx = 0;
    const savedIdx = sessionStorage.getItem('footer_video_idx');
    if (savedIdx !== null) {
      currentIdx = parseInt(savedIdx, 10);
    }

    let isVideoPlaying = true;

    const sendPlayerCommand = (command, args = '') => {
      try {
        if (footerIframe.contentWindow) {
          footerIframe.contentWindow.postMessage(
            JSON.stringify({ event: 'command', func: command, args: args }),
            '*'
          );
        }
      } catch (e) {
        console.error('Failed to send command to video player:', e);
      }
    };

    const updateVideoSrc = () => {
      const videoId = playlist[currentIdx];
      sessionStorage.setItem('footer_video_idx', currentIdx);

      let startSecs = 0;
      const savedTime = sessionStorage.getItem('yt_time_' + videoId);
      if (savedTime) {
        startSecs = Math.floor(parseFloat(savedTime));
        if (startSecs < 2) startSecs = 0;
      }

      if (window.footerPlayer && typeof window.footerPlayer.loadVideoById === 'function') {
        window.footerPlayer.loadVideoById({
          videoId: videoId,
          startSeconds: startSecs
        });
        window.footerPlayer.mute();
        isVideoPlaying = true;
        if (playPauseBtn) playPauseBtn.classList.remove('paused');
      } else {
        const startParam = startSecs ? `&start=${startSecs}` : '';
        const currentSrc = footerIframe.getAttribute('src') || '';
        const targetSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1&cc_load_policy=3${startParam}`;

        // Only update if src is actually different to prevent unnecessary reload
        if (!currentSrc.includes(videoId) || (startSecs > 2 && !currentSrc.includes('start='))) {
          footerIframe.src = targetSrc;
        }
        isVideoPlaying = true;
        if (playPauseBtn) playPauseBtn.classList.remove('paused');
      }
    };

    // If the saved index is different from default, or we have a saved time, run initial setup
    const defaultVideoId = playlist[0];
    const hasSavedTime = sessionStorage.getItem('yt_time_' + defaultVideoId) !== null;
    if (currentIdx !== 0 || hasSavedTime) {
      updateVideoSrc();
    }

    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        if (window.footerPlayer && typeof window.footerPlayer.getPlayerState === 'function') {
          const state = window.footerPlayer.getPlayerState();
          if (state === YT.PlayerState.PLAYING) {
            window.footerPlayer.pauseVideo();
            isVideoPlaying = false;
            playPauseBtn.classList.add('paused');
          } else {
            window.footerPlayer.playVideo();
            isVideoPlaying = true;
            playPauseBtn.classList.remove('paused');
          }
        } else {
          if (isVideoPlaying) {
            sendPlayerCommand('pauseVideo');
            isVideoPlaying = false;
            playPauseBtn.classList.add('paused');
          } else {
            sendPlayerCommand('playVideo');
            isVideoPlaying = true;
            playPauseBtn.classList.remove('paused');
          }
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIdx = (currentIdx - 1 + playlist.length) % playlist.length;
        updateVideoSrc();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIdx = (currentIdx + 1) % playlist.length;
        updateVideoSrc();
      });
    }
  };
  const initHeroSoundControls = () => {
    const soundBtn = document.getElementById('hero-sound-btn');
    if (!soundBtn) return;

    soundBtn.addEventListener('click', () => {
      const heroVideoId = 'PSAEz3Xyrvg';
      const player = window.activeYtPlayers ? window.activeYtPlayers.get(heroVideoId) : null;
      if (player && typeof player.isMuted === 'function') {
        if (player.isMuted()) {
          player.unMute();
          soundBtn.classList.add('sound-on');
        } else {
          player.mute();
          soundBtn.classList.remove('sound-on');
        }
      } else {
        const iframe = document.getElementById('hero-youtube-video');
        if (iframe && window.YT && typeof window.YT.get === 'function') {
          const ytPlayer = window.YT.get(iframe.id);
          if (ytPlayer && typeof ytPlayer.isMuted === 'function') {
            if (ytPlayer.isMuted()) {
              ytPlayer.unMute();
              soundBtn.classList.add('sound-on');
            } else {
              ytPlayer.mute();
              soundBtn.classList.remove('sound-on');
            }
          }
        }
      }
    });
  };
  initHeroSoundControls();
  initFooterControls();

  // ─────────────── Scroll Reveal Text Animation (The Wedding Filmer style) ───────────────
  const initScrollRevealText = () => {
    const container = document.querySelector('.scroll-reveal-container');
    if (!container) return;

    // Helper function to recursively wrap words in text nodes
    function wrapWords(element) {
      const nodes = Array.from(element.childNodes);
      element.innerHTML = ''; // clear content

      nodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          // Split text node by spaces, preserving whitespace separators
          const words = node.textContent.split(/(\s+)/);
          words.forEach(word => {
            if (word.trim() === '') {
              element.appendChild(document.createTextNode(word));
            } else {
              const span = document.createElement('span');
              span.className = 'scroll-reveal-word';
              span.textContent = word;
              element.appendChild(span);
            }
          });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.nodeName === 'STRONG') {
            const strongSpan = document.createElement('strong');
            wrapWords(node); // recursively wrap words inside strong
            // Transfer child nodes from recursively wrapped strong
            while(node.firstChild) {
              strongSpan.appendChild(node.firstChild);
            }
            element.appendChild(strongSpan);
          } else {
            // Clone node (like <br>) as is
            element.appendChild(node.cloneNode(true));
          }
        }
      });
    }

    wrapWords(container);

    const words = container.querySelectorAll('.scroll-reveal-word');
    if (words.length === 0) return;

    let wordData = [];

    // Function to calculate and cache vertical page-relative offsets
    const cacheWordOffsets = () => {
      wordData = [];
      words.forEach(word => {
        const rect = word.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;
        wordData.push({ element: word, top: absoluteTop });
      });
    };

    // Delay initial cache slightly to ensure layouts/fonts are settled
    setTimeout(cacheWordOffsets, 600);
    window.addEventListener('resize', cacheWordOffsets);

    // Optimized scroll event listener
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const centerLine = scrollY + (viewportHeight * 0.55); // triggers at 55% from viewport top

      wordData.forEach(item => {
        if (centerLine > item.top) {
          item.element.classList.add('highlighted');
        } else {
          item.element.classList.remove('highlighted');
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on load
    setTimeout(handleScroll, 800);
  };
  initScrollRevealText();

  // ─────────────── Global popstate History Handler ───────────────
  window.addEventListener('popstate', (e) => {
    // 1. Crew list overlay popstate check (if about page has local crew overlay open)
    const crewSection = document.getElementById('crew-section');
    if (crewSection && crewSection.classList.contains('show')) {
      // Handled by about.html local popstate listener
      return;
    }

    // 2. Lightbox Modal popstate
    const imgLightbox = document.getElementById('lightbox-modal') || (typeof imageLightbox !== 'undefined' ? imageLightbox : null);
    if (imgLightbox && imgLightbox.classList.contains('active')) {
      if (!e.state || !e.state.lightboxOpen) {
        if (typeof performCloseLightbox === 'function') performCloseLightbox();
      }
      return;
    }

    // 3. Video Lightbox popstate
    const vidLightbox = document.getElementById('video-lightbox') || (typeof videoLightbox !== 'undefined' ? videoLightbox : null);
    if (vidLightbox && vidLightbox.classList.contains('active')) {
      if (!e.state || !e.state.videoOpen) {
        if (typeof performCloseVideo === 'function') performCloseVideo();
      }
      return;
    }

    // 4. Testimonial Modal popstate
    const testModal = document.getElementById('testimonial-modal') || (typeof testimonialModal !== 'undefined' ? testimonialModal : null);
    if (testModal && testModal.classList.contains('active')) {
      if (!e.state || !e.state.testimonialOpen) {
        if (typeof window.performCloseTestimonial === 'function') {
          window.performCloseTestimonial();
        } else if (typeof performCloseTestimonial === 'function') {
          performCloseTestimonial();
        }
      }
      return;
    }

    // 5. Film Detail View popstate (on films.html)
    const filmDetailSec = document.getElementById('film-detail-section');
    if (filmDetailSec) {
      if (e.state && e.state.filmIndex !== undefined) {
        const index = e.state.filmIndex;
        const cards = document.querySelectorAll('.films-section .films-grid .film-card');
        if (cards && cards[index] && typeof showFilmDetail === 'function') {
          showFilmDetail(cards[index]);
        }
        return;
      } else if (filmDetailSec.style.display === 'block') {
        if (typeof closeFilmDetail === 'function') closeFilmDetail();
        return;
      }
    }

    // 6. Smooth Scroll Anchors popstate
    if (e.state && e.state.anchor) {
      const target = document.querySelector(e.state.anchor);
      if (target) {
        const offsetVal = window.innerWidth > 1024 ? 0 : -70;
        if (lenis) lenis.scrollTo(target, { offset: offsetVal });
        else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        const offsetVal = window.innerWidth > 1024 ? 0 : -70;
        if (lenis) lenis.scrollTo(target, { offset: offsetVal });
        else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Scroll to top of the page if no hash or anchor state
      if (lenis) lenis.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
