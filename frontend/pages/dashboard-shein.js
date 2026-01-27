import { postAuthedFormData, postAuthedJson } from "../js/apiClient.js";
import { clearAuth } from "../js/auth.js";
import {
  buildCategorySelector,
  ensureJsonString,
  escapeHtml,
  extractFirstUrl,
  normalizeImgUrl,
  renderCopyBtn,
  routeFromHash,
  safeExternalUrl,
  setPre,
  setTableLoading,
  showConfirmPopover,
  statusBadge,
} from "./dashboard-shared.js";

export function setupShein() {
  const refresh = document.getElementById("shein-refresh");
  const keywordsInput = document.getElementById("shein-keywords");
  const summary = document.getElementById("shein-goods-summary");
  const tbody = document.getElementById("shein-goods-tbody");
  const prev = document.getElementById("shein-prev");
  const next = document.getElementById("shein-next");
  const pageEl = document.getElementById("shein-page");
  const pageInput = document.getElementById("shein-page-input");
  const pageGo = document.getElementById("shein-page-go");
  const sizeInput = document.getElementById("shein-size");

  const listWrap = document.getElementById("shein-list-wrap");
  const uploadWrap = document.getElementById("shein-upload-wrap");
  const goUploadBtn = document.getElementById("shein-go-upload");
  const backToListBtn = document.getElementById("shein-back-to-list");
  const resetUploadBtn = document.getElementById("shein-reset");

  const stepBtn1 = document.getElementById("shein-step-1-btn");
  const stepBtn2 = document.getElementById("shein-step-2-btn");
  const stepBtn3 = document.getElementById("shein-step-3-btn");
  const stepBtn4 = document.getElementById("shein-step-4-btn");
  const stepDot1 = document.getElementById("shein-step-1-dot");
  const stepDot2 = document.getElementById("shein-step-2-dot");
  const stepDot3 = document.getElementById("shein-step-3-dot");
  const stepDot4 = document.getElementById("shein-step-4-dot");
  const stepCheck1 = document.getElementById("shein-step-1-check");
  const stepCheck2 = document.getElementById("shein-step-2-check");
  const stepCheck3 = document.getElementById("shein-step-3-check");
  const stepCheck4 = document.getElementById("shein-step-4-check");
  const stepHint1 = document.getElementById("shein-step-1-hint");
  const stepHint2 = document.getElementById("shein-step-2-hint");
  const stepHint3 = document.getElementById("shein-step-3-hint");
  const stepHint4 = document.getElementById("shein-step-4-hint");

  const panel1 = document.getElementById("shein-step-1-panel");
  const panel2 = document.getElementById("shein-step-2-panel");
  const panel3 = document.getElementById("shein-step-3-panel");
  const panel4 = document.getElementById("shein-step-4-panel");
  const next1 = document.getElementById("shein-step-next-1");
  const next2 = document.getElementById("shein-step-next-2");
  const next3 = document.getElementById("shein-step-next-3");
  const back2 = document.getElementById("shein-step-back-2");
  const back3 = document.getElementById("shein-step-back-3");
  const back4 = document.getElementById("shein-step-back-4");

  const catOut = document.getElementById("shein-cat-id");
  const catOutText = document.getElementById("shein-cat-id-text");
  const templateBtn = document.getElementById("shein-fetch-template");
  const templateClearBtn = document.getElementById("shein-template-clear");
  const templatePre = document.getElementById("shein-template");
  const templateMsg = document.getElementById("shein-template-msg");
  const sheinOthersInput = document.getElementById("shein-others");
  const sheinGoodsAttrInput = document.getElementById("shein-goods-attr");
  const specDefinesInput = document.getElementById("shein-spec-defines");

  const imageTypeSelect = document.getElementById("shein-image-type");
  const fileInput = document.getElementById("shein-file");
  const uploadBtn = document.getElementById("shein-upload");
  const uploadPre = document.getElementById("shein-upload-result");
  const imagePreview = document.getElementById("shein-image-preview");

  const goodsNameInput = document.getElementById("shein-goods-name");
  const goodsSnInput = document.getElementById("shein-goods-sn");
  const goodsBriefInput = document.getElementById("shein-goods-brief");
  const aliSellerSnInput = document.getElementById("shein-ali-seller-sn");
  const goodsWeightInput = document.getElementById("shein-goods-weight");
  const lengthInput = document.getElementById("shein-length");
  const wideInput = document.getElementById("shein-wide");
  const highInput = document.getElementById("shein-high");
  const productSnInput = document.getElementById("shein-product-sn");
  const productNumberInput = document.getElementById("shein-product-number");
  const productPriceInput = document.getElementById("shein-product-price");
  const albumImagesInput = document.getElementById("shein-album-images");
  const squareImagesInput = document.getElementById("shein-square-images");
  const colorBlockImagesInput = document.getElementById("shein-color-block-images");
  const detailImagesInput = document.getElementById("shein-detail-images");
  const createBtn = document.getElementById("shein-create");
  const createPre = document.getElementById("shein-create-result");

  if (!refresh || !tbody) return;

  let page = 1;
  let size = 15;
  let total = 0;
  let sheinStep = 1;
  let templateRes = null;
  let lastUploadOk = false;
  let lastSubmitOk = false;
  const uploadBuckets = {
    "1": [],
    "2": [],
    "5": [],
    "6": [],
    "7": [],
  };

  const setSummary = (t) => {
    if (!summary) return;
    summary.textContent = t || "-";
  };
  const setPager = () => {
    const pages = size > 0 ? Math.max(1, Math.ceil(total / size)) : 1;
    if (pageEl) pageEl.textContent = `第 ${page} / ${pages} 页`;
    if (prev) prev.disabled = page <= 1;
    if (next) next.disabled = page >= pages;
  };

  const getCatId = () => {
    const v = String(catOut?.dataset?.catLeafId || catOut?.textContent || "").trim();
    return v && v !== "-" ? v : "";
  };

  const setTemplateMsg = (msg) => {
    if (!templateMsg) return;
    if (!msg) {
      templateMsg.classList.add("hidden");
      templateMsg.textContent = "";
      return;
    }
    templateMsg.classList.remove("hidden");
    templateMsg.textContent = msg;
  };

  const parseJsonMaybe = (raw) => {
    const v = String(raw ?? "").trim();
    if (!v) return "";
    try {
      return JSON.parse(v);
    } catch {
      return v;
    }
  };

  const renderRows = (list) => {
    if (!tbody) return;
    if (!Array.isArray(list) || !list.length) {
      tbody.innerHTML =
        '<tr class="table-row-hover transition"><td class="px-6 py-10 text-center text-xs text-slate-400" colspan="8">暂无数据</td></tr>';
      return;
    }
    tbody.innerHTML = list
      .map((g, idx) => {
        const border = idx === list.length - 1 ? "" : "border-b border-slate-50";
        const goodsId = g?.goods_id ?? "-";
        const name = g?.goods_name ?? "-";
        const sn = g?.goods_sn ?? "-";
        const thumb = normalizeImgUrl(g?.goods_thumb ?? g?.goods_image ?? g?.goods_img ?? g?.img ?? "");
        const url = safeExternalUrl(g?.url);
        const time = g?.formated_add_time ?? g?.add_time ?? "-";
        const onSale = String(g?.is_on_sale ?? "");
        const review = String(g?.review_status ?? "");
        const price = g?.formated_shop_price ?? g?.shop_price ?? "-";

        const saleBadge =
          onSale === "1"
            ? statusBadge("在售", "border-emerald-200 bg-emerald-50 text-emerald-700")
            : statusBadge("未上架", "border-rose-200 bg-rose-50 text-rose-700");
        const reviewMeta = review ? statusBadge(review, "border-slate-200 bg-slate-50 text-slate-700") : statusBadge("-", "border-slate-200 bg-slate-50 text-slate-500");

        const openAttr = url ? `data-open-url="${escapeHtml(url)}" title="打开链接"` : "";
        const nameHtml = url
          ? `<button type="button" ${openAttr} class="text-left text-xs font-black text-slate-900 hover:text-accent whitespace-normal break-words">${escapeHtml(
              name,
            )}</button>`
          : `<div class="text-xs font-black text-slate-900 whitespace-normal break-words">${escapeHtml(name)}</div>`;
        const thumbHtml = (() => {
          if (!thumb) {
            return '<div class="w-16 h-16 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center text-xs text-slate-400"><i class="fas fa-image"></i></div>';
          }
          const box = `<div class="w-16 h-16 rounded-xl bg-slate-100 flex-shrink-0 bg-cover bg-center border border-slate-200" style="background-image: url('${escapeHtml(
            thumb,
          )}');"></div>`;
          return url ? `<button type="button" ${openAttr} class="block">${box}</button>` : box;
        })();

        const toggleBtn = `
          <button type="button" class="shein-toggle-sale inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-black text-slate-700" data-goods-id="${escapeHtml(
            goodsId,
          )}" data-next-val="${onSale === "1" ? "0" : "1"}">
            <i class="fas ${onSale === "1" ? "fa-toggle-on text-emerald-600" : "fa-toggle-off text-slate-400"} text-lg"></i>
            <span>${onSale === "1" ? "下架" : "上架"}</span>
          </button>
        `;

        return `
          <tr class="table-row-hover ${border} transition">
            <td class="px-6 py-4 font-medium text-slate-900">${escapeHtml(String(goodsId))}</td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                ${thumbHtml}
                <div class="min-w-0">
                  ${nameHtml}
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="inline-flex items-center text-xs font-semibold text-slate-800">
                <span>${escapeHtml(String(sn || "-"))}</span>
                ${sn ? renderCopyBtn(sn, "复制 SKU") : ""}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">${saleBadge}</td>
            <td class="px-6 py-4 whitespace-nowrap">${reviewMeta}</td>
            <td class="px-6 py-4 text-right text-xs font-black text-slate-900">${escapeHtml(String(price))}</td>
            <td class="px-6 py-4 text-xs text-slate-500">${escapeHtml(String(time))}</td>
            <td class="px-6 py-4 text-right">${toggleBtn}</td>
          </tr>
        `;
      })
      .join("");
  };

  const load = async () => {
    refresh.disabled = true;
    refresh.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-1"></i>加载中...';
    setTableLoading("shein-goods-tbody", 8);
    setSummary("加载中...");
    try {
      const keywords = keywordsInput?.value?.trim() || "";
      const res = await postAuthedJson("/api/goods/lists", {
        page,
        size,
        is_tiktok: 0,
        ...(keywords ? { keywords } : {}),
      });

      if (String(res?.code) === "2") {
        clearAuth();
        window.location.href = "/login.html";
        return;
      }

      if (String(res?.code) !== "0") {
        renderRows([]);
        setSummary(res?.msg || "加载失败");
        total = 0;
        setPager();
        return;
      }

      const list = Array.isArray(res?.data?.list) ? res.data.list : [];
      total = Number(res?.data?.num ?? list.length) || list.length;
      renderRows(list);
      setSummary(`本页 ${list.length} 条 · 共 ${total} 条`);
      setPager();
    } catch {
      renderRows([]);
      setSummary("网络异常，请稍后重试。");
    } finally {
      refresh.disabled = false;
      refresh.innerHTML = '<i class="fas fa-magnifying-glass mr-1"></i>搜索';
    }
  };

  const updateStepChecks = () => {
    const catOk = Boolean(getCatId());
    const tplOk = Boolean(templateRes);
    const imgOk = lastUploadOk;
    const submitOk = lastSubmitOk;
    if (stepCheck1) stepCheck1.hidden = !catOk;
    if (stepCheck2) stepCheck2.hidden = !tplOk;
    if (stepCheck3) stepCheck3.hidden = !imgOk;
    if (stepCheck4) stepCheck4.hidden = !submitOk;
  };

  const setStep = (n) => {
    sheinStep = Math.min(Math.max(n, 1), 4);
    const panels = [panel1, panel2, panel3, panel4];
    panels.forEach((p, idx) => {
      if (!p) return;
      const show = idx + 1 <= sheinStep;
      p.hidden = !show;
      p.classList.toggle("hidden", !show);
    });
    const actionGroups = [
      [next1],
      [back2, next2],
      [back3, next3],
      [back4],
    ];
    actionGroups.forEach((group, idx) => {
      const on = idx + 1 === sheinStep;
      group.forEach((btn) => {
        if (!btn) return;
        btn.hidden = !on;
        btn.classList.toggle("hidden", !on);
      });
    });
    updateStepChecks();
  };

  const renderImagePreview = () => {
    if (!imagePreview) return;
    const labelMap = {
      "1": "主图",
      "2": "细节图",
      "5": "方形图",
      "6": "色块图",
      "7": "详情图",
    };
    const blocks = Object.entries(uploadBuckets).map(([key, items]) => {
      const list = Array.isArray(items) ? items : [];
      const body = list.length
        ? list
            .map(
              (it) => `
                <div class="flex items-center gap-2 text-xs text-slate-600">
                  <button type="button" data-view-image="${escapeHtml(it.img_url)}" class="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 bg-white">
                    <img src="${escapeHtml(it.img_url)}" alt="img" class="w-full h-full object-cover" />
                  </button>
                  <div class="flex-1 break-all">${escapeHtml(it.img_url)}</div>
                </div>
              `,
            )
            .join("")
        : '<div class="text-[11px] text-slate-400">暂无图片</div>';
      return `
        <div class="rounded-2xl border border-slate-100 bg-white p-3 space-y-2">
          <div class="text-xs font-bold text-slate-700">${labelMap[key] || key}</div>
          ${body}
        </div>
      `;
    });
    imagePreview.innerHTML = blocks.join("");
  };

  const fillImageJsonIfEmpty = () => {
    const map = {
      "2": albumImagesInput,
      "5": squareImagesInput,
      "6": colorBlockImagesInput,
      "7": detailImagesInput,
    };
    Object.entries(map).forEach(([key, input]) => {
      if (!input) return;
      if (String(input.value || "").trim()) return;
      const list = uploadBuckets[key] || [];
      if (!list.length) return;
      input.value = JSON.stringify(
        list.map((it) => ({ img_url: it.img_url, img_id: it.img_id || "0" })),
        null,
        2,
      );
    });
  };

  const resetUpload = () => {
    templateRes = null;
    lastUploadOk = false;
    lastSubmitOk = false;
    if (templatePre) setPre(templatePre, "");
    if (uploadPre) setPre(uploadPre, "");
    if (createPre) setPre(createPre, "");
    if (sheinOthersInput) sheinOthersInput.value = "";
    if (sheinGoodsAttrInput) sheinGoodsAttrInput.value = "";
    if (specDefinesInput) specDefinesInput.value = "";
    if (productSnInput) productSnInput.value = "";
    if (productNumberInput) productNumberInput.value = "";
    if (productPriceInput) productPriceInput.value = "";
    if (albumImagesInput) albumImagesInput.value = "";
    if (squareImagesInput) squareImagesInput.value = "";
    if (colorBlockImagesInput) colorBlockImagesInput.value = "";
    if (detailImagesInput) detailImagesInput.value = "";
    if (goodsNameInput) goodsNameInput.value = "";
    if (goodsSnInput) goodsSnInput.value = "";
    if (goodsBriefInput) goodsBriefInput.value = "";
    if (aliSellerSnInput) aliSellerSnInput.value = "";
    if (goodsWeightInput) goodsWeightInput.value = "";
    if (lengthInput) lengthInput.value = "";
    if (wideInput) wideInput.value = "";
    if (highInput) highInput.value = "";
    Object.keys(uploadBuckets).forEach((k) => {
      uploadBuckets[k] = [];
    });
    renderImagePreview();
    setTemplateMsg("");
    setStep(1);
  };

  if (refresh) {
    refresh.addEventListener("click", () => {
      page = 1;
      load();
    });
  }
  if (keywordsInput) {
    keywordsInput.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      page = 1;
      load();
    });
  }
  if (sizeInput) {
    sizeInput.addEventListener("blur", () => {
      const v = Number(sizeInput.value || 15);
      const nextSize = Math.max(1, Math.min(200, Math.floor(Number.isFinite(v) ? v : 15)));
      if (nextSize === size) return;
      size = nextSize;
      sizeInput.value = String(size);
      page = 1;
      load();
    });
  }
  if (prev) prev.addEventListener("click", () => { page = Math.max(1, page - 1); load(); });
  if (next) next.addEventListener("click", () => { page += 1; load(); });
  if (pageGo) {
    pageGo.addEventListener("click", () => {
      const v = Number(pageInput?.value || 1) || 1;
      page = Math.max(1, Math.floor(v));
      load();
    });
  }
  if (pageInput) {
    pageInput.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      const v = Number(pageInput.value || 1) || 1;
      page = Math.max(1, Math.floor(v));
      load();
    });
  }

  if (tbody) {
    tbody.addEventListener("click", async (e) => {
      const btn = e.target?.closest?.(".shein-toggle-sale");
      if (!btn) return;
      const pending = btn.dataset.pending === "1";
      if (pending) return;
      const goodsId = String(btn.dataset.goodsId ?? "").trim();
      const nextVal = String(btn.dataset.nextVal ?? "").trim();
      if (!goodsId || (nextVal !== "0" && nextVal !== "1")) return;
      btn.dataset.pending = "1";
      const originalHtml = btn.innerHTML;
      btn.classList.add("opacity-70");
      btn.innerHTML = '<i class="fas fa-circle-notch fa-spin text-[11px]"></i>切换中...';
      try {
        const res = await postAuthedJson("/api/goods/toggle_on_sale", { id: goodsId, val: nextVal });
        if (String(res?.code) === "2") {
          clearAuth();
          window.location.href = "/login.html";
          return;
        }
        if (String(res?.code) !== "0") {
          setSummary(res?.msg || "操作失败");
          return;
        }
        setSummary(res?.msg || "操作成功");
        await load();
      } catch {
        setSummary("网络异常，请稍后重试。");
      } finally {
        btn.dataset.pending = "0";
        btn.classList.remove("opacity-70");
        btn.innerHTML = originalHtml;
      }
    });
  }

  const parseSubViewFromHash = () => {
    const raw = (window.location.hash || "").replace("#", "");
    if (!raw.startsWith("upload-shein")) return "";
    const q = raw.split("?")[1] || "";
    const params = new URLSearchParams(q);
    return params.get("mode") === "upload" ? "upload" : "";
  };

  const updateSheinHash = (mode) => {
    if (routeFromHash() !== "upload-shein") return;
    const params = new URLSearchParams();
    if (mode === "upload") params.set("mode", "upload");
    const q = params.toString();
    const next = q ? `#upload-shein?${q}` : "#upload-shein";
    if (window.location.hash !== next) window.location.hash = next;
  };

  const setSubView = (mode, opts) => {
    const m = mode === "upload" ? "upload" : "list";
    const updateHash = opts?.updateHash !== false;
    if (listWrap) {
      const show = m === "list";
      listWrap.hidden = !show;
      listWrap.classList.toggle("hidden", !show);
    }
    if (uploadWrap) {
      const show = m === "upload";
      uploadWrap.hidden = !show;
      uploadWrap.classList.toggle("hidden", !show);
    }
    if (updateHash && routeFromHash() === "upload-shein") updateSheinHash(m);
  };

  if (goUploadBtn) {
    goUploadBtn.addEventListener("click", () => {
      resetUpload();
      setSubView("upload", { updateHash: true });
    });
  }
  if (backToListBtn) backToListBtn.addEventListener("click", () => setSubView("list", { updateHash: true }));
  if (resetUploadBtn) resetUploadBtn.addEventListener("click", resetUpload);

  buildCategorySelector("shein-cat-select", "shein", "shein-cat-id");

  if (catOut) {
    const observer = new MutationObserver(() => {
      const catId = getCatId();
      if (catOutText) catOutText.textContent = catId || "-";
      if (stepHint1) stepHint1.textContent = catId ? `已选类目 ${catId}` : "请选择叶子类目";
      if (catId && stepDot1) {
        stepDot1.classList.remove("bg-accent/10", "text-accent");
        stepDot1.classList.add("bg-emerald-100", "text-emerald-700");
      }
      updateStepChecks();
    });
    try {
      observer.observe(catOut, { childList: true, characterData: true, subtree: true });
    } catch {
      // ignore
    }
  }

  if (stepBtn1) stepBtn1.addEventListener("click", () => setStep(1));
  if (stepBtn2) stepBtn2.addEventListener("click", () => setStep(2));
  if (stepBtn3) stepBtn3.addEventListener("click", () => setStep(3));
  if (stepBtn4) stepBtn4.addEventListener("click", () => setStep(4));
  if (next1) next1.addEventListener("click", () => {
    if (!getCatId()) {
      setTemplateMsg("请先选择类目");
      return;
    }
    setStep(2);
  });
  if (back2) back2.addEventListener("click", () => setStep(1));
  if (next2) next2.addEventListener("click", () => setStep(3));
  if (back3) back3.addEventListener("click", () => setStep(2));
  if (next3) next3.addEventListener("click", () => setStep(4));
  if (back4) back4.addEventListener("click", () => setStep(3));

  if (templateBtn) {
    templateBtn.addEventListener("click", async () => {
      const catId = getCatId();
      if (!catId) {
        setTemplateMsg("请先选择类目");
        return;
      }
      templateBtn.disabled = true;
      setTemplateMsg("加载中...");
      setPre(templatePre, "");
      try {
        const res = await postAuthedJson("/api/shein/getAttributeTemplate", { goods_id: "0", cat_id: catId });
        if (String(res?.code) === "2") {
          clearAuth();
          window.location.href = "/login.html";
          return;
        }
        if (String(res?.code) !== "0") {
          setTemplateMsg(res?.msg || "获取失败");
          return;
        }
        templateRes = res;
        setTemplateMsg("获取成功");
        setPre(templatePre, res);
      } catch {
        setTemplateMsg("网络异常");
      } finally {
        templateBtn.disabled = false;
        updateStepChecks();
      }
    });
  }
  if (templateClearBtn) {
    templateClearBtn.addEventListener("click", () => {
      templateRes = null;
      if (templatePre) setPre(templatePre, "");
      setTemplateMsg("");
      updateStepChecks();
    });
  }

  if (uploadBtn) {
    uploadBtn.addEventListener("click", async () => {
      if (!fileInput || !fileInput.files || !fileInput.files.length) {
        setPre(uploadPre, { code: "1", msg: "请选择图片文件" });
        return;
      }
      const file = fileInput.files[0];
      const imageType = String(imageTypeSelect?.value || "").trim();
      const formData = new FormData();
      formData.append("file", file);
      if (imageType) formData.append("image_type", imageType);
      uploadBtn.disabled = true;
      uploadBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-1"></i>上传中...';
      try {
        const res = await postAuthedFormData("/api/shein/upload_shein_img", formData);
        if (String(res?.code) === "2") {
          clearAuth();
          window.location.href = "/login.html";
          return;
        }
        setPre(uploadPre, res);
        const raw = res?.data || res;
        const imgUrl =
          raw?.img_url ||
          raw?.url ||
          raw?.data?.img_url ||
          raw?.data?.url ||
          extractFirstUrl(JSON.stringify(raw));
        if (imgUrl) {
          const bucket = uploadBuckets[imageType] || [];
          bucket.push({ img_url: imgUrl, img_id: raw?.img_id || "0" });
          uploadBuckets[imageType] = bucket;
          lastUploadOk = true;
          renderImagePreview();
          fillImageJsonIfEmpty();
          if (stepHint3) stepHint3.textContent = `已上传 ${bucket.length} 张`;
        }
      } catch {
        setPre(uploadPre, { code: "1", msg: "上传失败" });
      } finally {
        uploadBtn.disabled = false;
        uploadBtn.innerHTML = '<i class="fas fa-upload mr-1"></i>上传';
        updateStepChecks();
      }
    });
  }

  if (createBtn) {
    createBtn.addEventListener("click", async () => {
      const catId = getCatId();
      if (!catId) {
        setPre(createPre, { code: "1", msg: "请先选择类目" });
        return;
      }
      const payload = {
        goods_name: String(goodsNameInput?.value || "").trim(),
        goods_sn: String(goodsSnInput?.value || "").trim(),
        cat_id: catId,
        goods_brief: String(goodsBriefInput?.value || "").trim(),
        ali_seller_sn: String(aliSellerSnInput?.value || "").trim(),
        sheinOthers: ensureJsonString(sheinOthersInput?.value || ""),
        goods_weight: String(goodsWeightInput?.value || "").trim(),
        length: String(lengthInput?.value || "").trim(),
        wide: String(wideInput?.value || "").trim(),
        high: String(highInput?.value || "").trim(),
        shein_goods_attr: parseJsonMaybe(sheinGoodsAttrInput?.value),
        product_sn: parseJsonMaybe(productSnInput?.value),
        product_number: parseJsonMaybe(productNumberInput?.value),
        product_price: parseJsonMaybe(productPriceInput?.value),
        spec_defines: parseJsonMaybe(specDefinesInput?.value),
        album_images: parseJsonMaybe(albumImagesInput?.value),
        square_images: parseJsonMaybe(squareImagesInput?.value),
        color_block_images: parseJsonMaybe(colorBlockImagesInput?.value),
        detail_images: parseJsonMaybe(detailImagesInput?.value),
      };
      createBtn.disabled = true;
      createBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-1"></i>提交中...';
      try {
        const res = await postAuthedJson("/api/shein/insert", payload);
        if (String(res?.code) === "2") {
          clearAuth();
          window.location.href = "/login.html";
          return;
        }
        setPre(createPre, res);
        lastSubmitOk = String(res?.code) === "0";
        if (stepHint4) stepHint4.textContent = lastSubmitOk ? "提交成功" : "提交失败";
      } catch {
        setPre(createPre, { code: "1", msg: "提交失败" });
      } finally {
        createBtn.disabled = false;
        createBtn.innerHTML = '<i class="fas fa-paper-plane mr-1"></i>提交';
        updateStepChecks();
      }
    });
  }

  setSubView(parseSubViewFromHash() || "list", { updateHash: false });
  window.addEventListener("hashchange", () => {
    if (routeFromHash() !== "upload-shein") return;
    const mode = parseSubViewFromHash() || "list";
    setSubView(mode, { updateHash: false });
  });

  renderImagePreview();
  setStep(1);
  load();
}
