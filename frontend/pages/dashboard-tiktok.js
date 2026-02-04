import { postAuthedFormData, postAuthedJson } from "../js/apiClient.js";
import { clearAuth, getAuth } from "../js/auth.js";
import { buildCategorySelector, ensureImageViewer, ensureJsonString, escapeHtml, extractFirstUrl, formatUnixTimeMaybe, getOrderGoodsUrl, isAlibabaUser, isImageFile, mapAlibabaOrderStatus, mapOrderStatus, mapPayStatus, mapReviewBadge, mapReviewStatusText, mapShippingStatus, mapThirdOrderStatus, normalizeImgUrl, onSaleToggleIcon, openExternalUrl, parseJsonObject, renderCopyBtn, renderGoodsTable, renderGoodsTableInto, renderOrdersTable, renderTemuGoodsTableInto, resolveTopmAssetUrl, routeFromHash, safeExternalUrl, setActiveNav, setOrdersError, setPre, setTableLoading, setupRoutes, showConfirmPopover, showOnlyView, statusBadge, wsStatusBadge } from "./dashboard-shared.js";

export function setupTikTok() {
  const goUploadBtn = document.getElementById("tiktok-go-upload");
  const backToListBtn = document.getElementById("tiktok-back-to-list");
  const listWrap = document.getElementById("tiktok-list-wrap");
  const uploadWrap = document.getElementById("tiktok-upload-wrap");

  const reset = document.getElementById("tiktok-reset");
  const templateBtn = document.getElementById("tiktok-fetch-template");
  const templateClearBtn = document.getElementById("tiktok-template-clear");
  const templatePre = document.getElementById("tiktok-template");
  const templateFormMsg = document.getElementById("tiktok-template-form-msg");
  const templateForm = document.getElementById("tiktok-template-form");
  const attrSummary = document.getElementById("tiktok-attr-summary");
  const fileInput = document.getElementById("tiktok-file");
  const uploadGoodsBtn = document.getElementById("tiktok-upload-goods");
  const uploadAttrsBtn = document.getElementById("tiktok-upload-attrs");
  const uploadPre = document.getElementById("tiktok-upload-result");
  const imagePreview = document.getElementById("tiktok-image-preview");
  const salesAttrBlock = document.getElementById("tiktok-sales-attr-block");
  const salesAttrFileInput = document.getElementById("tiktok-sales-attr-file");
  const salesAttrNamesEl = document.getElementById("tiktok-sales-attr-names");
  const salesAttrMsg = document.getElementById("tiktok-sales-attr-msg");
  const salesAttrCustomInput = document.getElementById("tiktok-sales-attr-custom");
  const salesAttrCustomAdd = document.getElementById("tiktok-sales-attr-custom-add");
  const salesAttrValuesEl = document.getElementById("tiktok-sales-attr-values");
  const salesModeToggle = document.getElementById("tiktok-sales-mode-toggle");
  const salesModeLabel = document.getElementById("tiktok-sales-mode-label");
  const salesAttrNameBlock = document.getElementById("tiktok-sales-attr-name-block");
  const priceStockCard = document.getElementById("tiktok-price-stock-card");
  const skuGridBlock = document.getElementById("tiktok-sku-grid-block");
  const skuGridEl = document.getElementById("tiktok-sku-grid");
  const skuModal = document.getElementById("tiktok-sku-modal");
  const skuModalOverlay = document.getElementById("tiktok-sku-modal-overlay");
  const skuModalClose = document.getElementById("tiktok-sku-modal-close");
  const skuModalTitle = document.getElementById("tiktok-sku-modal-title");
  const skuModalSubtitle = document.getElementById("tiktok-sku-modal-subtitle");
  const skuModalStatus = document.getElementById("tiktok-sku-modal-status");
  const skuModalImages = document.getElementById("tiktok-sku-modal-images");
  const skuModalUpload = document.getElementById("tiktok-sku-modal-upload");
  const skuModalFile = document.getElementById("tiktok-sku-modal-file");
  const imageViewer = ensureImageViewer();
  const certificationsBlock = document.getElementById("tiktok-certifications-block");
  const certFileInput = document.getElementById("tiktok-cert-file");
  const brandSearchName = document.getElementById("tiktok-brand-search-name");
  const brandSearchBtn = document.getElementById("tiktok-brand-search");
  const brandResults = document.getElementById("tiktok-brand-results");
  const brandSummary = document.getElementById("tiktok-brand-summary");
  const brandList = document.getElementById("tiktok-brand-list");
  const brandBlock = document.getElementById("tiktok-brand-block");
  const brandTrigger = document.getElementById("tiktok-brand-trigger");
  const brandTriggerLabel = document.getElementById("tiktok-brand-trigger-label");
  const brandSelectedChip = document.getElementById("tiktok-brand-selected-chip");
  const brandDropdown = document.getElementById("tiktok-brand-dropdown");
  const brandSelectedHint = document.getElementById("tiktok-brand-selected-hint");
  const brandClearBtn = document.getElementById("tiktok-brand-clear");
  const brandCloseBtn = document.getElementById("tiktok-brand-close");
  const brandResetBtn = document.getElementById("tiktok-brand-reset");
  const brandCreateToggle = document.getElementById("tiktok-brand-create-toggle");
  const brandCreatePanel = document.getElementById("tiktok-brand-create-panel");
  const brandCreateCancel = document.getElementById("tiktok-brand-create-cancel");
  const brandCreateName = document.getElementById("tiktok-brand-create-name");
  const brandCreateBtn = document.getElementById("tiktok-brand-create");
  const brandSearchBtnDefaultHtml = brandSearchBtn ? brandSearchBtn.innerHTML : "";
  const brandCreateBtnDefaultHtml = brandCreateBtn ? brandCreateBtn.innerHTML : "";
  const warehousesBtn = document.getElementById("tiktok-fetch-warehouses");
  const warehousesPre = document.getElementById("tiktok-warehouses");
  const warehouseSelect = document.getElementById("tiktok-warehouse-select");
  const createBtn = document.getElementById("tiktok-create");
  const createPre = document.getElementById("tiktok-create-result");
  const selfCheckBtn = document.getElementById("tiktok-selfcheck");
  const selfCheckMsg = document.getElementById("tiktok-selfcheck-msg");
  const stepBtn1 = document.getElementById("tiktok-step-1-btn");
  const stepBtn2 = document.getElementById("tiktok-step-2-btn");
  const stepBtn3 = document.getElementById("tiktok-step-3-btn");
  const stepBtn4 = document.getElementById("tiktok-step-4-btn");
  const stepBtn5 = document.getElementById("tiktok-step-5-btn");
  const stepDot1 = document.getElementById("tiktok-step-1-dot");
  const stepDot2 = document.getElementById("tiktok-step-2-dot");
  const stepDot3 = document.getElementById("tiktok-step-3-dot");
  const stepDot4 = document.getElementById("tiktok-step-4-dot");
  const stepDot5 = document.getElementById("tiktok-step-5-dot");
  const stepCheck1 = document.getElementById("tiktok-step-1-check");
  const stepCheck2 = document.getElementById("tiktok-step-2-check");
  const stepCheck3 = document.getElementById("tiktok-step-3-check");
  const stepCheck4 = document.getElementById("tiktok-step-4-check");
  const stepCheck5 = document.getElementById("tiktok-step-5-check");
  const stepHint1 = document.getElementById("tiktok-step-1-hint");
  const stepHint2 = document.getElementById("tiktok-step-2-hint");
  const stepHint3 = document.getElementById("tiktok-step-3-hint");
  const stepHint4 = document.getElementById("tiktok-step-4-hint");
  const stepHint5 = document.getElementById("tiktok-step-5-hint");
  let stepPanels = [];
  let stepNext1 = null;
  let stepNext2 = null;
  let stepNext3 = null;
  let stepNext4 = null;
  let stepBack2 = null;
  let stepBack3 = null;
  let stepBack4 = null;
  let stepBack5 = null;

  let activeUploadStep = 1;
  let unlockedUploadStep = 1;
  let salesModeEnabled = true;
  let skuModalMode = "full";
  const SIMPLE_SKU_KEY = "__single_sku__";

  const applySalesMode = (enabled) => {
    const on = Boolean(enabled);
    salesModeEnabled = on;
    const toggle = (el, show) => {
      if (!el) return;
      el.hidden = !show;
      el.classList.toggle("hidden", !show);
    };
    toggle(salesAttrNameBlock, on);
    toggle(salesAttrValuesEl, on);
    toggle(skuGridBlock, on);
    toggle(priceStockCard, !on);
    if (salesModeLabel) salesModeLabel.textContent = on ? "已开启" : "已关闭";
    if (!on && !skuDraft.has(SIMPLE_SKU_KEY)) {
      skuDraft.set(SIMPLE_SKU_KEY, {
        sku_identifier_type: "GTIN",
        sku_identifier_code: "",
        product_sn: "",
        product_number: "",
        product_price: "",
        attr_img_list: [],
      });
    }
  };

  // Build step panels dynamically to mimic TEMU layout without touching HTML markup.
  (() => {
    if (!uploadWrap) return;
    const catBlock =
      document.getElementById("tiktok-cat-block") ||
      document.getElementById("tiktok-cat-select")?.closest(".space-y-2");
    const tplBlock =
      document.getElementById("tiktok-template-block") ||
      document.getElementById("tiktok-template-form")?.closest(".space-y-3") ||
      document.getElementById("tiktok-template-form")?.closest(".space-y-2");
    const attrBlock = document.getElementById("tiktok-attr-result")?.closest(".bg-slate-50\\/60") ||
      document.getElementById("tiktok-attr-result")?.closest(".bg-slate-50\\/60") ||
      document.getElementById("tiktok-attr-result")?.closest("div");
    const uploadBlock = document.getElementById("tiktok-upload-goods")?.closest(".space-y-2");
    const descBlock =
      document.getElementById("tiktok-desc-block") ||
      document.getElementById("tiktok-goods-name")?.closest(".space-y-2");
    const submitBlock =
      document.getElementById("tiktok-submit-block") ||
      document.getElementById("tiktok-create")?.closest(".space-y-2");

    const oldGrid1 = catBlock?.parentElement;
    const oldGrid2 = uploadBlock?.parentElement;
    const oldDescWrap = descBlock?.parentElement;
    const oldSubmitWrap = submitBlock?.parentElement;

    const mkStep = (id) => {
      const div = document.createElement("div");
      div.id = id;
      div.className = "space-y-3";
      return div;
    };
    const step1 = mkStep("tiktok-panel-cat");
    const step2 = mkStep("tiktok-panel-template");
    const step3 = mkStep("tiktok-panel-upload");
    const step4 = mkStep("tiktok-panel-desc");
    const step5 = mkStep("tiktok-panel-submit");

    if (catBlock) {
      catBlock.classList.add("rounded-2xl", "border", "border-slate-100", "bg-white", "p-4");
      step1.appendChild(catBlock);
      const actions = document.createElement("div");
      actions.className = "flex justify-end";
      actions.innerHTML = `<button id="tiktok-step-next-1" type="button" class="px-4 py-2 rounded-xl bg-accent text-white text-xs font-semibold hover:bg-accent/90">下一步 <i class="fas fa-arrow-right ml-1"></i></button>`;
      step1.appendChild(actions);
    }

    if (tplBlock) {
      tplBlock.classList.add("rounded-2xl", "border", "border-slate-100", "bg-white", "p-4");
      step2.appendChild(tplBlock);
    }
    if (attrBlock) {
      attrBlock.classList.remove("hidden");
      step2.appendChild(attrBlock);
    }
    const actions2 = document.createElement("div");
    actions2.className = "flex items-center justify-between";
    actions2.innerHTML = `
      <button id="tiktok-step-back-2" type="button" class="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"><i class="fas fa-arrow-left mr-1"></i> 上一步</button>
      <button id="tiktok-step-next-2" type="button" class="px-4 py-2 rounded-xl bg-accent text-white text-xs font-semibold hover:bg-accent/90">下一步 <i class="fas fa-arrow-right ml-1"></i></button>`;
    step2.appendChild(actions2);

    if (uploadBlock) {
      uploadBlock.classList.add("rounded-2xl", "border", "border-slate-100", "bg-white", "p-4");
      step3.appendChild(uploadBlock);
    }
    const actions3 = document.createElement("div");
    actions3.className = "flex items-center justify-between";
    actions3.innerHTML = `
      <button id="tiktok-step-back-3" type="button" class="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"><i class="fas fa-arrow-left mr-1"></i> 上一步</button>
      <button id="tiktok-step-next-3" type="button" class="px-4 py-2 rounded-xl bg-accent text-white text-xs font-semibold hover:bg-accent/90">下一步 <i class="fas fa-arrow-right ml-1"></i></button>`;
    step3.appendChild(actions3);

    if (descBlock) {
      descBlock.classList.add("rounded-2xl", "border", "border-slate-100", "bg-white", "p-4");
      step4.appendChild(descBlock);
      const actions4 = document.createElement("div");
      actions4.className = "flex items-center justify-between";
      actions4.innerHTML = `
        <button id="tiktok-step-back-4" type="button" class="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"><i class="fas fa-arrow-left mr-1"></i> 上一步</button>
        <button id="tiktok-step-next-4" type="button" class="px-4 py-2 rounded-xl bg-accent text-white text-xs font-semibold hover:bg-accent/90">下一步 <i class="fas fa-arrow-right ml-1"></i></button>`;
      step4.appendChild(actions4);
    }

    if (submitBlock) {
      submitBlock.classList.add("rounded-2xl", "border", "border-slate-100", "bg-white", "p-4");
      step5.appendChild(submitBlock);
    }

    // Remove empty grids
    if (oldGrid1 && oldGrid1.children.length === 0) oldGrid1.remove();
    if (oldGrid2 && oldGrid2.children.length === 0) oldGrid2.remove();
    if (oldDescWrap && oldDescWrap.children.length === 0) oldDescWrap.remove();
    if (oldSubmitWrap && oldSubmitWrap.children.length === 0) oldSubmitWrap.remove();

    // Append steps
    uploadWrap.appendChild(step1);
    uploadWrap.appendChild(step2);
    uploadWrap.appendChild(step3);
    uploadWrap.appendChild(step4);
    uploadWrap.appendChild(step5);

    // Hide panels 2-4 initially
    step2.classList.add("hidden");
    step3.classList.add("hidden");
    step4.classList.add("hidden");
    step5.classList.add("hidden");
  })();

  if (salesModeToggle) {
    applySalesMode(salesModeToggle.checked);
    salesModeToggle.addEventListener("change", () => {
      applySalesMode(salesModeToggle.checked);
    });
  } else {
    applySalesMode(true);
  }
  if (priceStockCard) {
    priceStockCard.addEventListener("click", () => {
      openPriceStockModal();
    });
  }

  const syncStepNodes = () => {
    stepPanels = [
      document.getElementById("tiktok-panel-cat"),
      document.getElementById("tiktok-panel-template"),
      document.getElementById("tiktok-panel-upload"),
      document.getElementById("tiktok-panel-desc"),
      document.getElementById("tiktok-panel-submit"),
    ];
    stepNext1 = document.getElementById("tiktok-step-next-1");
    stepNext2 = document.getElementById("tiktok-step-next-2");
    stepNext3 = document.getElementById("tiktok-step-next-3");
    stepNext4 = document.getElementById("tiktok-step-next-4");
    stepBack2 = document.getElementById("tiktok-step-back-2");
    stepBack3 = document.getElementById("tiktok-step-back-3");
    stepBack4 = document.getElementById("tiktok-step-back-4");
    stepBack5 = document.getElementById("tiktok-step-back-5");
  };
  syncStepNodes();

  const attrAttrId = document.getElementById("tiktok-attr-attrid");
  const attrTypeId = document.getElementById("tiktok-attr-type-id");
  const attrTypeName = document.getElementById("tiktok-attr-type-name");
  const attrValue = document.getElementById("tiktok-attr-value");
  const attrGoodsId = document.getElementById("tiktok-attr-goods-id");
  const attrSubmit = document.getElementById("tiktok-attr-submit");
  const attrPre = document.getElementById("tiktok-attr-result");
  const tplAttrSel = document.getElementById("tiktok-attr-template-attr");
  const tplValueSel = document.getElementById("tiktok-attr-template-value");
  const attrEntryToggle = document.getElementById("tiktok-attr-entry-toggle");
  const attrEntryBlock = document.getElementById("tiktok-attr-entry-block");

  const catOut = document.getElementById("tiktok-cat-id");
  if (!catOut) return;
  const catRoot = document.getElementById("tiktok-cat-select");

  // Ensure SKU core fields can be filled during step 2 (template stage), even if the
  // page HTML is cached by the local server/browser.
  const SKU_CORE_FIELDS = [
    { id: "tiktok-sku-identifier-code", label: "商品识别码" },
    { id: "tiktok-sku-price", label: "零售价" },
    { id: "tiktok-sku-stock", label: "库存数量" },
    { id: "tiktok-sku-sn", label: "卖家 SKU" },
  ];

  const markSkuCoreField = (id, invalid) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle("border-rose-300", invalid);
    el.classList.toggle("ring-2", invalid);
    el.classList.toggle("ring-rose-200", invalid);
    const wrap = el.closest("[data-sku-core-field]");
    if (wrap) {
      wrap.classList.toggle("bg-rose-50/40", invalid);
      wrap.classList.toggle("rounded-xl", invalid);
      wrap.classList.toggle("p-2", invalid);
    }
  };

  const validateSkuCoreFields = () => {
    const missing = [];
    SKU_CORE_FIELDS.forEach((f) => {
      const el = document.getElementById(f.id);
      const val = el?.value?.trim() ?? "";
      const bad = !val;
      if (bad) missing.push(f);
      markSkuCoreField(f.id, bad);
    });
    return missing;
  };

  const ensureSkuCoreFieldsInTemplate = () => {
    const host = document.getElementById("tiktok-template-block");
    const form = document.getElementById("tiktok-template-form");
    if (!host || !form) return;

    let block = document.getElementById("tiktok-sku-core-block");
    if (!block) {
      block = document.createElement("div");
      block.id = "tiktok-sku-core-block";
      block.className = "bg-white border border-slate-100 rounded-2xl p-4 space-y-3";
      block.innerHTML = `
        <div class="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <i class="fas fa-barcode text-slate-500"></i>
          <span>SKU 核心字段</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2" data-sku-core-grid="1"></div>
      `;
      form.insertAdjacentElement("afterend", block);
    }

    const grid = block.querySelector("[data-sku-core-grid='1']");
    if (!grid) return;

    for (const f of SKU_CORE_FIELDS) {
      const el = document.getElementById(f.id);
      if (!el) continue;
      // Prefer visible labels; keep placeholder empty.
      el.setAttribute("placeholder", "");
      el.classList.add("w-full");

      let wrap = grid.querySelector(`[data-sku-core-field='${f.id}']`);
      if (!wrap) {
        wrap = document.createElement("div");
        wrap.dataset.skuCoreField = f.id;
        wrap.className = "space-y-1";
        wrap.innerHTML = `
          <div class="flex items-center gap-2 text-[11px] font-semibold text-slate-600" data-sku-core-label="1">
            <span>${escapeHtml(f.label)}</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-50 border border-rose-100 text-rose-600 font-black">必填</span>
          </div>
        `;
        grid.appendChild(wrap);
      } else {
        const labelEl = wrap.querySelector("[data-sku-core-label='1']");
        if (labelEl) {
          const spans = labelEl.querySelectorAll("span");
          if (spans && spans.length) spans[0].textContent = f.label;
        }
      }
      if (f.id === "tiktok-sku-identifier-code") {
        const typeSel = document.getElementById("tiktok-sku-identifier-type");
        let group = wrap.querySelector("[data-sku-identifier-group]");
        if (!group) {
          group = document.createElement("div");
          group.dataset.skuIdentifierGroup = "1";
          group.className = "flex items-center rounded-lg border border-slate-200 bg-white overflow-hidden";
          const divider = document.createElement("div");
          divider.className = "w-px h-6 bg-slate-200";
          group.appendChild(divider);
          wrap.appendChild(group);
        }
        if (typeSel && typeSel.parentElement !== group) {
          group.insertBefore(typeSel, group.firstChild);
        }
        if (el.parentElement !== group) {
          group.appendChild(el);
        }
        wrap.querySelectorAll("#tiktok-sku-identifier-code").forEach((node) => {
          if (node !== el) node.remove();
        });
        wrap.querySelectorAll("#tiktok-sku-identifier-type").forEach((node) => {
          if (node !== typeSel) node.remove();
        });
        if (typeSel) {
          typeSel.className = "px-2.5 py-2 text-xs bg-white border-0 focus:ring-0 focus:outline-none";
        }
        el.className = "flex-1 min-w-0 px-3 py-2 text-xs bg-white border-0 focus:ring-0 focus:outline-none";
        el.disabled = false;
        el.readOnly = false;
        el.style.pointerEvents = "auto";
      } else {
        if (el.parentElement !== wrap) wrap.appendChild(el);
      }
      el.addEventListener("input", () => markSkuCoreField(f.id, false));
    }
  };
  ensureSkuCoreFieldsInTemplate();
  let draftState = null;
  let draftApplied = false;
  let pendingDraft = null;

  const parseSubViewFromHash = () => {
    const raw = (window.location.hash || "").replace("#", "");
    if (!raw.startsWith("upload-tiktok")) return "";
    const q = raw.split("?")[1] || "";
    const params = new URLSearchParams(q);
    return params.get("mode") === "upload" ? "upload" : "list";
  };

  const setSubView = (mode, opts) => {
    const m = mode === "upload" ? "upload" : "list";
    const updateHash = opts?.updateHash !== false;
    try {
      window.sessionStorage.setItem("topm:tiktok-subview", m);
    } catch {
      // ignore
    }

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

    if (updateHash && routeFromHash() === "upload-tiktok") {
      const next = m === "upload" ? "#upload-tiktok?mode=upload" : "#upload-tiktok";
      if (window.location.hash !== next) window.location.hash = next;
    }
  };

  const getSubView = () => {
    try {
      const v = window.sessionStorage.getItem("topm:tiktok-subview");
      return v === "upload" ? "upload" : "list";
    } catch {
      return "list";
    }
  };

  if (goUploadBtn) {
    goUploadBtn.addEventListener("click", () => {
      try {
        window.sessionStorage.removeItem("topm:tiktok-edit-id");
      } catch {
        // ignore
      }
      setSubView("upload", { updateHash: true });
    });
  }
  if (backToListBtn) backToListBtn.addEventListener("click", () => setSubView("list", { updateHash: true }));
  setSubView(parseSubViewFromHash() || getSubView(), { updateHash: false });
  window.addEventListener("hashchange", () => {
    if (routeFromHash() !== "upload-tiktok") return;
    const mode = parseSubViewFromHash() || getSubView();
    setSubView(mode, { updateHash: false });
  });

  const updateAttrEntryVisibility = (enabled) => {
    const on = Boolean(enabled);
    if (attrEntryBlock) {
      attrEntryBlock.hidden = !on;
      attrEntryBlock.classList.toggle("hidden", !on);
    }
    if (attrEntryToggle) attrEntryToggle.checked = on;
  };
  updateAttrEntryVisibility(false);
  if (attrEntryToggle) {
    attrEntryToggle.addEventListener("change", () => {
      updateAttrEntryVisibility(attrEntryToggle.checked);
    });
  }

  let lastAttrIndex = new Map();
  let lastTemplateRes = null;
  const selectedAttrs = new Map(); // attrId -> { values: [{ value, goods_attr_id }] }
  let lastTemplateCatId = "";
  let lastBrandList = [];
  let brandDefaultList = [];
  const MAX_CERT_IMAGES = 10;
  const MAX_SALES_ATTR_IMAGES = 3;
  const MAX_TIKTOK_IMAGES = 9;
  const MAX_SALES_ATTR_NAMES = 3;
  const NOM_CERT_ID = "nom_mark_images";
  const NOM_CERT_ENTRY = {
    id: NOM_CERT_ID,
    name: "NOM mark images",
    required: false,
    details: "",
    sample: "",
    raw: {},
  };
  let salesAttrEnabled = false;
  let salesAttrRows = [];
  let salesAttrUploadInFlight = false;
  const salesAttrSelections = new Map();
  const skuDraft = new Map();
  let activeSkuKey = "";
  let lastCertifications = [];
  const certificationUploads = new Map(); // certId -> [uploadData]
  let certUploadInFlight = false;
  let templateFetchInFlight = false;
  const uploadQueue = [];
  let uploadPendingCount = 0;
  let uploadInFlight = false;
  const uploadGoodsBtnDefaultHtml = uploadGoodsBtn ? uploadGoodsBtn.innerHTML : "";
  const uploadAttrsBtnDefaultHtml = uploadAttrsBtn ? uploadAttrsBtn.innerHTML : "";
  const normalizeAttrId = (attrId) => String(attrId ?? "").trim();
  const getSelectedBucket = (attrId) => {
    const id = normalizeAttrId(attrId);
    if (!id) return null;
    let bucket = selectedAttrs.get(id);
    if (!bucket) {
      bucket = { values: [] };
      selectedAttrs.set(id, bucket);
    }
    if (!Array.isArray(bucket.values)) bucket.values = [];
    return bucket;
  };
  const getSelectedValues = (attrId) => {
    const id = normalizeAttrId(attrId);
    if (!id) return [];
    const bucket = selectedAttrs.get(id);
    return Array.isArray(bucket?.values) ? bucket.values : [];
  };
  const isAttrValueSelected = (attrId, value) => {
    const v = String(value ?? "").trim();
    if (!v) return false;
    return getSelectedValues(attrId).some((item) => String(item?.value ?? "").trim() === v);
  };
  const getSelectedAttrCount = () => selectedAttrs.size;
  const getSelectedValueCount = () => {
    let count = 0;
    for (const bucket of selectedAttrs.values()) {
      if (Array.isArray(bucket?.values)) count += bucket.values.length;
    }
    return count;
  };

  const DRAFT_KEY = "topm:tiktok-upload-draft";
  const DRAFT_FIELD_IDS = [
    "tiktok-goods-name",
    "tiktok-goods-sn",
    "tiktok-ali-seller-sn",
    "tiktok-goods-brief",
    "tiktok-attrs-json",
    "tiktok-img-json",
    "tiktok-extra-json",
    "tiktok-sku-stock",
    "tiktok-sku-price",
    "tiktok-sku-identifier-type",
    "tiktok-sku-identifier-code",
    "tiktok-sku-sn",
  ];

  let draftSaveTimer = 0;

  const loadDraft = () => {
    try {
      const raw = window.sessionStorage.getItem(DRAFT_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return null;
      return parsed;
    } catch {
      return null;
    }
  };

  const clearDraft = () => {
    try {
      window.sessionStorage.removeItem(DRAFT_KEY);
    } catch {
      // ignore
    }
  };

  const readFieldValue = (id) => {
    const el = document.getElementById(id);
    if (!el) return null;
    if ("value" in el) return el.value;
    return null;
  };

  const writeFieldValue = (id, value) => {
    const el = document.getElementById(id);
    if (!el || !("value" in el)) return;
    el.value = value == null ? "" : String(value);
  };

  const getCatDraft = () => {
    const leafId = String(catOut?.textContent ?? "").trim();
    const pathText = String(document.getElementById("tiktok-cat-id-text")?.textContent ?? "").trim();
    const pathParts = pathText ? pathText.split(" > ").map((x) => String(x).trim()).filter(Boolean) : [];
    let ids = [];
    try {
      const rawIds = catOut?.dataset?.catIds;
      if (rawIds) {
        const parsed = JSON.parse(rawIds);
        if (Array.isArray(parsed)) ids = parsed.map((x) => String(x).trim()).filter(Boolean);
      }
    } catch {
      // ignore
    }
    if (!leafId && !pathText && !pathParts.length && !ids.length) return null;
    return { leafId, pathText, pathParts, ids };
  };

  const buildDraftSnapshot = () => {
    const values = {};
    DRAFT_FIELD_IDS.forEach((id) => {
      const v = readFieldValue(id);
      if (v != null) values[id] = v;
    });
    return {
      v: 1,
      updatedAt: Date.now(),
      values,
      cat: getCatDraft(),
    };
  };

  const hasMeaningfulDraft = (draft) => {
    if (!draft) return false;
    const values = draft.values || {};
    const hasValue = Object.values(values).some((v) => String(v ?? "").trim());
    if (hasValue) return true;
    const cat = draft.cat || {};
    return Boolean(String(cat.leafId ?? "").trim() || String(cat.pathText ?? "").trim());
  };

  const saveDraft = () => {
    const snapshot = buildDraftSnapshot();
    if (!hasMeaningfulDraft(snapshot)) {
      clearDraft();
      return;
    }
    try {
      window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(snapshot));
    } catch {
      // ignore
    }
  };

  const queueDraftSave = () => {
    if (draftSaveTimer) return;
    draftSaveTimer = window.setTimeout(() => {
      draftSaveTimer = 0;
      saveDraft();
    }, 250);
  };

  const applyDraftToForm = (draft) => {
    if (!draft || !draft.values) return;
    const values = draft.values || {};
    DRAFT_FIELD_IDS.forEach((id) => {
      if (Object.prototype.hasOwnProperty.call(values, id)) {
        writeFieldValue(id, values[id]);
      }
    });
  };

  const restoreAttrSelectionsFromDraft = (draft) => {
    if (!draft || !draft.values) return;
    selectedAttrs.clear();
    const raw = String(draft.values["tiktok-attrs-json"] ?? "").trim();
    if (!raw) return;
    let arr = [];
    try {
      arr = JSON.parse(raw);
    } catch {
      return;
    }
    if (!Array.isArray(arr)) return;
    for (const item of arr) {
      const id = String(item?.attrId ?? item?.attr_id ?? "").trim();
      const name = String(item?.attr_value_name ?? item?.value ?? "").trim();
      const goodsAttrId = String(item?.attr_value_id ?? item?.goods_attr_id ?? "").trim();
      if (!id || !name || !goodsAttrId) continue;
      const bucket = getSelectedBucket(id);
      if (!bucket) continue;
      const exists = bucket.values.some(
        (entry) =>
          String(entry?.value ?? "").trim() === name &&
          String(entry?.goods_attr_id ?? "").trim() === goodsAttrId,
      );
      if (!exists) bucket.values.push({ value: name, goods_attr_id: goodsAttrId });
    }
  };

  const canRestoreDraftAttrs = (catId) => {
    if (!draftState || draftApplied) return false;
    const draftCatId = String(draftState?.cat?.leafId ?? "").trim();
    const cid = String(catId ?? "").trim();
    if (!draftCatId || !cid) return false;
    return draftCatId === cid;
  };

  draftState = loadDraft();
  pendingDraft = draftState;
  if (draftState && parseSubViewFromHash() === "upload") {
    setSubView("upload", { updateHash: false });
  }
  const draftCatState = draftState?.cat ? draftState.cat : null;

  buildCategorySelector("tiktok-cat-select", "tiktok", "tiktok-cat-id", {
    restore: Boolean(draftCatState),
    persist: false,
    initialState: draftCatState,
  });

  const getCatId = () => String(catOut?.textContent ?? "").trim();
  const isCatSelected = () => {
    const v = getCatId();
    return Boolean(v) && v !== "-";
  };

  const refreshTemplateEnabled = () => {
    if (!templateBtn) return;
    const leafId = getCatId();
    templateBtn.disabled = !leafId || leafId === "-";
    templateBtn.classList.toggle("opacity-50", templateBtn.disabled);
    templateBtn.classList.toggle("cursor-not-allowed", templateBtn.disabled);
  };

  refreshTemplateEnabled();

  const showTemplateMsg = (message) => {
    if (!templateFormMsg) return;
    if (!message) {
      templateFormMsg.classList.add("hidden");
      templateFormMsg.textContent = "";
      return;
    }
    templateFormMsg.classList.remove("hidden");
    templateFormMsg.textContent = String(message);
  };

  const showUploadMsg = (message) => {
    if (!uploadPre) return;
    if (!message) {
      uploadPre.classList.add("hidden");
      uploadPre.textContent = "";
      return;
    }
    uploadPre.classList.remove("hidden");
    uploadPre.textContent = String(message);
  };

  const showBrandSummary = (message, tone = "") => {
    if (!brandSummary) return;
    const text = String(message || "").trim();
    brandSummary.textContent = text;
    brandSummary.classList.toggle("text-rose-500", tone === "error");
    brandSummary.classList.toggle("text-emerald-600", tone === "success");
    brandSummary.classList.toggle("text-slate-400", !tone || tone === "info");
  };

  const hashCode = (str) => {
    let hash = 0;
    const s = String(str ?? "");
    for (let i = 0; i < s.length; i += 1) {
      hash = ((hash << 5) - hash + s.charCodeAt(i)) | 0;
    }
    return hash;
  };

  const getCurrentBrandId = () => String(document.getElementById("tiktok-brand-id")?.value ?? "").trim();

  const findBrandNameById = (id) => {
    const target = String(id || "").trim();
    if (!target) return "";
    const fromList = lastBrandList.find((b) => String(b?.id ?? b?.brand_id ?? "") === target);
    if (fromList) return String(fromList?.name ?? fromList?.brand_name ?? fromList?.brandName ?? "");
    if (brandResults) {
      const opt = Array.from(brandResults.options).find((o) => String(o.value) === target);
      if (opt) return opt.textContent?.trim() || "";
    }
    return "";
  };

  const updateBrandSelectedHint = () => {
    const id = getCurrentBrandId();
    const name = findBrandNameById(id);
    if (brandTriggerLabel) {
      brandTriggerLabel.textContent = id ? `${name || "未命名品牌"}` : "未选择，点击筛选";
    }
    if (brandSelectedChip) {
      brandSelectedChip.classList.toggle("hidden", !id);
    }
    if (brandSelectedHint) {
      brandSelectedHint.classList.toggle("hidden", !id);
      brandSelectedHint.textContent = id ? "已选 1" : "已选 0";
    }
  };

  const renderBrandList = (list, selectedId = "") => {
    if (!brandList) return;
    let items = Array.isArray(list) ? list : [];
    if (!items.length && brandResults) {
      items = Array.from(brandResults.options)
        .filter((opt) => opt.value)
        .map((opt) => ({ id: opt.value, name: opt.textContent || opt.value }));
    }
    if (!items.length) {
      brandList.innerHTML = '<div class="text-xs text-slate-400 px-3 py-2">暂无品牌</div>';
      return;
    }
    const normalizedSelected = String(selectedId || "").trim();
    const cards = items.map((b) => {
      const id = String(b?.id ?? b?.brand_id ?? "");
      const name = String(b?.name ?? b?.brand_name ?? b?.brandName ?? "");
      const isActive = normalizedSelected && normalizedSelected === id;
      const base =
        "rounded-xl border px-3 py-2 bg-white flex items-center justify-between gap-3 transition cursor-pointer";
      const cls = isActive
        ? `${base} border-accent/40 bg-accent/5 ring-2 ring-accent/20`
        : `${base} border-slate-100 hover:border-accent/40 hover:shadow-sm`;
      return `
        <button type="button" class="${cls}" data-brand-id="${escapeHtml(id)}" title="${escapeHtml(name || "未命名品牌")}">
          <div class="flex-1 min-w-0 text-left">
            <div class="text-sm font-semibold text-slate-800 truncate">${escapeHtml(name || "未命名品牌")}</div>
          </div>
          <span class="text-[10px] font-bold ${isActive ? "text-accent" : "text-slate-300"}">${isActive ? "已选" : ""}</span>
        </button>
      `;
    });
    brandList.innerHTML = cards.join("");
  };

  const normalizeBrandList = (res) => {
    const data = res?.data;
    const brands = data?.brands ?? data?.brand_list ?? data?.brandList ?? data?.list ?? data;
    const list = Array.isArray(brands)
      ? brands
      : Array.isArray(brands?.list)
        ? brands.list
        : brands && typeof brands === "object"
          ? Object.values(brands)
          : [];
    return list
      .map((item) => {
        if (!item) return null;
        const id = String(item.id ?? item.brand_id ?? item.brandId ?? "");
        const name = String(item.name ?? item.brand_name ?? item.brandName ?? id);
        return {
          ...item,
          id,
          name,
          authorized_status: item.authorized_status ?? item.auth_status ?? "",
        };
      })
      .filter((item) => item && (item.id || item.name));
  };

  const setDefaultBrandListIfEmpty = (list) => {
    if (brandDefaultList.length) return;
    brandDefaultList = Array.isArray(list) ? list.slice() : [];
  };

  const filterBrandList = (list, keyword) => {
    const q = String(keyword || "").trim().toLowerCase();
    if (!q) return list;
    return list.filter((b) => {
      const id = String(b?.id ?? b?.brand_id ?? "").toLowerCase();
      const name = String(b?.name ?? b?.brand_name ?? b?.brandName ?? "").toLowerCase();
      return id.includes(q) || name.includes(q);
    });
  };

  const updateBrandListView = (keyword = "") => {
    const selectedId = getCurrentBrandId();
    renderBrandList(filterBrandList(lastBrandList, keyword), selectedId);
    updateBrandSelectedHint();
  };

  let brandDropdownOpen = false;
  const setBrandDropdown = (open) => {
    if (!brandDropdown) return;
    brandDropdownOpen = Boolean(open);
    brandDropdown.classList.toggle("hidden", !brandDropdownOpen);
    if (brandDropdownOpen) {
      updateBrandListView(brandSearchName?.value || "");
      showBrandSummary("");
    } else {
      if (brandCreatePanel) brandCreatePanel.classList.add("hidden");
      if (brandCreateName) brandCreateName.value = "";
    }
  };

  const applyBrandSelection = (brandId, opts = {}) => {
    const id = String(brandId || "").trim();
    if (!id) return;
    const brandInput = document.getElementById("tiktok-brand-id");
    if (brandInput) brandInput.value = id;
    if (brandResults) brandResults.value = id;
    updateBrandListView(brandSearchName?.value || "");
    if (opts.close !== false) setBrandDropdown(false);
  };

  const renderAttrSummary = () => {
    if (!attrSummary) return;
    const attrCount = getSelectedAttrCount();
    const valueCount = getSelectedValueCount();
    attrSummary.innerHTML =
      attrCount > 0
        ? `<i class="fas fa-circle-check text-emerald-600 mr-1"></i>已选择并记录 ${attrCount} 项属性 / ${valueCount} 个值（已自动写入提交数据）`
        : `<i class="fas fa-circle text-slate-300 mr-1"></i>尚未选择属性`;
  };

  const parseTikTokAttrsJson = () => {
    const textarea = document.getElementById("tiktok-attrs-json");
    const raw = String(textarea?.value ?? "").trim();
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const writeTikTokAttrsJson = (arr) => {
    const textarea = document.getElementById("tiktok-attrs-json");
    if (!textarea) return;
    textarea.value = JSON.stringify(Array.isArray(arr) ? arr : []);
    queueDraftSave();
  };

  const resolveTikTokUploadUrl = (data) => {
    const u = safeExternalUrl(data?.url ?? data?.uri ?? data?.file_path ?? data?.filePath ?? data?.imgUrl ?? "");
    return u || "";
  };

  const parseTikTokImgJson = () => {
    const textarea = document.getElementById("tiktok-img-json");
    const raw = String(textarea?.value ?? "").trim();
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
      if (parsed && typeof parsed === "object") return [parsed];
      return [];
    } catch {
      return [];
    }
  };

  const writeTikTokImgJson = (arr) => {
    const textarea = document.getElementById("tiktok-img-json");
    if (!textarea) return;
    textarea.value = JSON.stringify(Array.isArray(arr) ? arr : []);
    queueDraftSave();
  };

  const readExtraJson = () => {
    const textarea = document.getElementById("tiktok-extra-json");
    if (!textarea) return {};
    const raw = String(textarea.value ?? "").trim();
    if (!raw) return {};
    try {
      return parseJsonObject(raw);
    } catch {
      return null;
    }
  };

  const writeExtraJson = (obj) => {
    const textarea = document.getElementById("tiktok-extra-json");
    if (!textarea) return;
    const payload = obj && typeof obj === "object" && !Array.isArray(obj) ? obj : {};
    textarea.value = JSON.stringify(payload);
    queueDraftSave();
  };

  const normalizeCertifications = (raw) => {
    let list = [];
    if (Array.isArray(raw)) list = raw;
    else if (Array.isArray(raw?.list)) list = raw.list;
    else if (raw && typeof raw === "object") list = Object.values(raw);
    return list
      .map((c) => {
        const id = c?.id ?? c?.certification_id ?? c?.certificationId ?? c?.cert_id ?? c?.certId;
        if (id == null) return null;
        const name = c?.name ?? c?.certification_name ?? c?.certName ?? c?.title ?? id;
        const requiredFlag = c?.is_required ?? c?.required;
        const required = requiredFlag === true || requiredFlag === 1 || requiredFlag === "1";
        return {
          id: String(id),
          name: String(name ?? id),
          required,
          details: String(c?.document_details ?? c?.documentDetails ?? c?.detail ?? ""),
          sample: String(c?.sample_image_url ?? c?.sampleImageUrl ?? ""),
          raw: c,
        };
      })
      .filter((c) => c && c.id);
  };

  const ensureNomCert = (list) => {
    const next = Array.isArray(list) ? list.slice() : [];
    if (!next.some((c) => String(c?.id ?? "") === NOM_CERT_ID)) {
      next.push({ ...NOM_CERT_ENTRY });
    }
    return next;
  };

  const getCertUploads = (certId) => {
    const id = String(certId ?? "").trim();
    if (!id) return [];
    const list = certificationUploads.get(id);
    return Array.isArray(list) ? list : [];
  };

  const setCertUploads = (certId, list) => {
    const id = String(certId ?? "").trim();
    if (!id) return;
    const next = Array.isArray(list) ? list : [];
    certificationUploads.set(id, next);
    syncExtraWithCerts();
  };

  const syncExtraWithCerts = () => {
    const extra = readExtraJson();
    if (extra == null) return;
    const types = {};
    const data = {};
    for (const [id, list] of certificationUploads.entries()) {
      if (!Array.isArray(list) || list.length === 0) continue;
      types[id] = ["img"];
      data[id] = list;
    }
    if (Object.keys(types).length) {
      extra.certifications_type = types;
      extra.certifications_data = data;
    } else {
      delete extra.certifications_type;
      delete extra.certifications_data;
    }
    writeExtraJson(extra);
  };

  const restoreCertUploadsFromExtra = () => {
    const extra = readExtraJson();
    if (extra == null) return;
    const data = extra?.certifications_data;
    if (!data || typeof data !== "object" || Array.isArray(data)) return;
    const allowed = new Set(lastCertifications.map((c) => String(c.id)));
    certificationUploads.clear();
    for (const [id, items] of Object.entries(data)) {
      if (allowed.size && !allowed.has(String(id))) continue;
      if (Array.isArray(items)) certificationUploads.set(String(id), items.slice(0, MAX_CERT_IMAGES));
    }
  };

  const setCertMsg = (certId, message, tone = "") => {
    if (!certificationsBlock) return;
    const id = String(certId ?? "").trim();
    if (!id) return;
    const el = certificationsBlock.querySelector(`[data-cert-msg][data-cert-id="${id}"]`);
    if (!el) return;
    const text = String(message || "").trim();
    el.textContent = text;
    el.classList.toggle("hidden", !text);
    el.classList.toggle("text-rose-600", tone === "error");
    el.classList.toggle("text-emerald-600", tone === "success");
    el.classList.toggle("text-slate-400", !tone || tone === "info");
  };

  const renderCertifications = () => {
    if (!certificationsBlock) return;
    if (!lastCertifications.length) {
      certificationsBlock.innerHTML = "";
      return;
    }
    const header = `
      <div class="flex items-center gap-2 text-xs font-bold text-slate-600">
        <span class="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[10px] font-black">证</span>
        <span>证书资料上传（每项最多 ${MAX_CERT_IMAGES} 张）</span>
      </div>
    `;
    const cards = lastCertifications
      .map((cert) => {
        const list = getCertUploads(cert.id);
        const count = list.length;
        const sampleBtn = cert.sample
          ? `<button type="button" class="px-3 py-1.5 rounded-xl border border-slate-200 text-[11px] font-semibold text-slate-600 hover:bg-slate-50 whitespace-nowrap" data-cert-sample="${escapeHtml(
              cert.sample
            )}"><i class="fas fa-image mr-1"></i>样例</button>`
          : "";
        const items = list
          .map((it, idx) => {
            const url = resolveTikTokUploadUrl(it);
            const label = `#${idx + 1}`;
            return `
              <div class="group relative rounded-xl border border-slate-200 bg-white overflow-hidden">
                <div class="aspect-square bg-slate-50 flex items-center justify-center">
                  ${
                    url
                      ? `<img src="${escapeHtml(url)}" class="w-full h-full object-contain p-2" alt="${escapeHtml(
                          label
                        )}" onerror="this.style.display='none';" />`
                      : `<div class="text-[11px] text-slate-400">无url</div>`
                  }
                </div>
                <div class="px-2 py-1 text-[11px] text-slate-500 flex items-center justify-between">
                  <span class="font-mono">${escapeHtml(label)}</span>
                  <button type="button" class="text-rose-600 hover:text-rose-700" data-cert-remove="${escapeHtml(
                    cert.id
                  )}" data-cert-idx="${idx}" title="移除">
                    <i class="fas fa-xmark"></i>
                  </button>
                </div>
              </div>
            `;
          })
          .join("");
        return `
          <div class="rounded-2xl border border-slate-100 bg-white p-4 space-y-3">
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <div class="text-sm font-black text-slate-900 flex items-center gap-2">
                  <span class="break-words">${escapeHtml(cert.name || cert.id)}</span>
                  <span class="text-[10px] px-2 py-0.5 rounded-full border ${
                    cert.required ? "border-rose-200 bg-rose-50 text-rose-600" : "border-slate-200 bg-slate-50 text-slate-500"
                  }">${cert.required ? "必填" : "选填"}</span>
                </div>
                ${
                  cert.details
                    ? `<div class="text-[11px] text-slate-400 mt-1">${escapeHtml(cert.details)}</div>`
                    : ""
                }
              </div>
              <div class="flex items-center gap-2">
                ${sampleBtn}
                <button type="button" class="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-[11px] font-semibold hover:bg-slate-800 whitespace-nowrap" data-cert-upload="${escapeHtml(
                  cert.id
                )}">
                  <i class="fas fa-upload mr-1"></i>上传
                </button>
              </div>
            </div>
            <div class="text-[11px] text-slate-400 hidden" data-cert-msg data-cert-id="${escapeHtml(cert.id)}"></div>
            ${
              items
                ? `<div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">${items}</div>`
                : '<div class="text-[11px] text-slate-400">暂无证书图片</div>'
            }
            <div class="text-[11px] text-slate-400">已上传 ${count} / ${MAX_CERT_IMAGES}</div>
          </div>
        `;
      })
      .join("");
    certificationsBlock.innerHTML = `${header}${cards}`;
  };

  const renderTikTokImagePreview = () => {
    if (!imagePreview) return;
    const list = parseTikTokImgJson();
    const pendingHint =
      uploadPendingCount > 0
        ? `<div class="text-[11px] text-amber-600 mb-2"><i class="fas fa-cloud-arrow-up mr-1"></i>等待上传 ${uploadPendingCount} 张</div>`
        : "";
    if (!list.length) {
      imagePreview.innerHTML =
        pendingHint ||
        '<div class="text-[11px] text-slate-400">暂无图片（上传后会自动出现预览）</div>';
      renderTikTokStepper();
      return;
    }
    const items = list.slice(0, 24).map((it, idx) => {
      const url = resolveTikTokUploadUrl(it);
      const label = `#${idx + 1}`;
      return `
        <div class="group relative rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div class="aspect-square bg-slate-50 flex items-center justify-center">
            ${
              url
                ? `<img src="${escapeHtml(url)}" class="w-full h-full object-contain p-2" alt="${escapeHtml(
                    label
                  )}" onerror="this.style.display='none';" />`
                : `<div class="text-[11px] text-slate-400">无 url</div>`
            }
          </div>
          <div class="px-2 py-1 text-[11px] text-slate-500 flex items-center justify-between">
            <span class="font-mono">${escapeHtml(label)}</span>
            <button type="button" class="tiktok-img-remove text-rose-600 hover:text-rose-700" data-idx="${idx}" title="移除">
              <i class="fas fa-xmark"></i>
            </button>
          </div>
        </div>
      `;
    });
    imagePreview.innerHTML = `
      ${pendingHint}
      <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        ${items.join("")}
      </div>
      ${list.length > 24 ? `<div class="text-[11px] text-slate-400 mt-2">仅预览前 24 个（当前 ${list.length} 个）</div>` : ""}
    `;
    renderTikTokStepper({ autoAdvance: true });
  };

  const getRequiredCertMissing = () => {
    if (!lastCertifications.length) return [];
    return lastCertifications.filter((c) => c.required && getCertUploads(c.id).length === 0);
  };

  const syncCertificationsFromTemplate = (res) => {
    lastCertifications = ensureNomCert(normalizeCertifications(res?.data?.certifications));
    restoreCertUploadsFromExtra();
    renderCertifications();
  };

  const clearCertificationsState = () => {
    lastCertifications = [];
    certificationUploads.clear();
    renderCertifications();
    syncExtraWithCerts();
  };

  const ensureSalesAttrRow = () => ({
    key: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    attrId: "",
    attrName: "",
    value: "",
    goodsAttrId: "",
    images: [],
    msg: "",
  });

  const normalizeSalesAttrRows = () => (Array.isArray(salesAttrRows) ? salesAttrRows.filter(Boolean) : []);

  const updateSalesAttrRow = (key, patch) => {
    salesAttrRows = normalizeSalesAttrRows().map((row) => (row.key === key ? { ...row, ...patch } : row));
  };

  const removeSalesAttrRow = (key) => {
    salesAttrRows = normalizeSalesAttrRows().filter((row) => row.key !== key);
    if (!salesAttrRows.length) salesAttrRows = [ensureSalesAttrRow()];
  };

  const buildSalesAttrMap = (items) => {
    const map = new Map();
    (items || []).forEach((it) => {
      const id = String(it?.id ?? "");
      if (id) map.set(id, it);
    });
    return map;
  };

  const syncExtraWithSalesAttrs = () => {
    const extra = readExtraJson();
    if (extra == null) return;
    const payload = normalizeSalesAttrRows()
      .filter((row) => row.attrId || row.value || (row.images && row.images.length))
      .map((row) => ({
        attr_id: row.attrId || "",
        attr_name: row.attrName || "",
        attr_value_name: row.value || "",
        attr_value_id: row.goodsAttrId || "",
        images: Array.isArray(row.images) ? row.images : [],
      }));
    if (salesAttrEnabled && payload.length) {
      extra.sales_attr_images = payload;
    } else {
      delete extra.sales_attr_images;
    }
    writeExtraJson(extra);
  };

  const upsertSalesAttrToAttrsJson = (row) => {
    if (!row?.attrId || !row?.goodsAttrId) return;
    let current = parseTikTokAttrsJson();
    current = current.filter((x) => {
      const xId = String(x?.attrId ?? x?.attr_id ?? "").trim();
      const xVal = String(x?.attr_value_name ?? x?.value ?? "").trim();
      return !(xId === String(row.attrId).trim() && xVal === String(row.value ?? "").trim());
    });
    current.push({
      attrId: row.attrId,
      attr_value_id: String(row.goodsAttrId),
      attr_value_name: row.value || "",
    });
    writeTikTokAttrsJson(current);
  };

  const ensureSalesAttrRecorded = async (row, salesMap) => {
    if (!row?.attrId || !row?.value) return row;
    if (row.goodsAttrId) return row;
    const item = salesMap.get(String(row.attrId));
    const typeName = item?.name || row.attrName || "";
    const goodsId = attrGoodsId?.value?.trim() || "0";
    try {
      const res = await postAuthedJson("/api/tiktok/insert_attr_input", {
        goods_id: goodsId,
        attr_value: row.value,
        type_name: typeName,
        type_id: row.attrId,
      });
      if (String(res?.code) === "2") {
        clearAuth();
        window.location.href = "/login.html";
        return row;
      }
      if (String(res?.code) !== "0" || !res?.data?.goods_attr_id) {
        return { ...row, msg: res?.msg || "记录销售属性失败" };
      }
      const next = { ...row, goodsAttrId: String(res.data.goods_attr_id), msg: "已记录" };
      upsertSalesAttrToAttrsJson(next);
      return next;
    } catch {
      return { ...row, msg: "网络异常，请稍后重试" };
    }
  };

  const uploadSalesAttrImages = async (row, files, salesMap) => {
    if (!row) return row;
    if (!row.attrId || !row.value) {
      return { ...row, msg: "请先选择销售属性并填写值" };
    }
    if (salesAttrUploadInFlight) return { ...row, msg: "正在上传，请稍后" };
    const current = Array.isArray(row.images) ? row.images : [];
    const remaining = Math.max(0, MAX_SALES_ATTR_IMAGES - current.length);
    if (remaining <= 0) return { ...row, msg: `最多 ${MAX_SALES_ATTR_IMAGES} 张图片` };
    const list = Array.from(files || [])
      .filter(Boolean)
      .filter((file) => isImageFile(file))
      .slice(0, remaining);
    if (!list.length) return { ...row, msg: "请上传图片文件" };
    salesAttrUploadInFlight = true;
    let nextRow = await ensureSalesAttrRecorded(row, salesMap);
    if (!nextRow.goodsAttrId) {
      salesAttrUploadInFlight = false;
      return nextRow;
    }
    try {
      for (const file of list) {
        const form = new FormData();
        form.append("file", file);
        form.append("use_case", "ATTRIBUTE_IMAGE");
        const res = await postAuthedFormData("/api/tiktok/upload_attrs_img", form);
        if (String(res?.code) === "2") {
          clearAuth();
          window.location.href = "/login.html";
          break;
        }
        if (String(res?.code) !== "0" || !res?.data) {
          nextRow = { ...nextRow, msg: res?.msg || "上传失败" };
          continue;
        }
        const data = { ...res.data, use_case: res.data?.use_case || "ATTRIBUTE_IMAGE" };
        const imgs = Array.isArray(nextRow.images) ? nextRow.images.slice() : [];
        imgs.push(data);
        nextRow = { ...nextRow, images: imgs };
      }
      return nextRow;
    } finally {
      salesAttrUploadInFlight = false;
    }
  };

  const renderSalesAttrBlock = () => {
    if (!salesAttrBlock) return;
    const salesItems = getTikTokSalesItems();
    const salesMap = buildSalesAttrMap(salesItems);
    if (!salesItems.length) {
      salesAttrBlock.innerHTML = "";
      salesAttrRows = [];
      salesAttrEnabled = false;
      syncExtraWithSalesAttrs();
      return;
    }
    if (!salesAttrRows.length) salesAttrRows = [ensureSalesAttrRow()];

    const rowsHtml = normalizeSalesAttrRows()
      .map((row) => {
        const imgs = Array.isArray(row.images) ? row.images : [];
        const options = salesItems
          .map(
            (it) =>
              `<option value="${escapeHtml(it.id)}" ${String(row.attrId) === String(it.id) ? "selected" : ""}>${escapeHtml(
                it.name
              )}</option>`
          )
          .join("");
        const imgHtml = imgs
          .map((it, idx) => {
            const url = resolveTikTokUploadUrl(it);
            return `
              <div class="group relative rounded-xl border border-slate-200 bg-white overflow-hidden">
                <div class="aspect-square bg-slate-50 flex items-center justify-center">
                  ${
                    url
                      ? `<img src="${escapeHtml(url)}" class="w-full h-full object-contain p-2" />`
                      : `<div class="text-[11px] text-slate-400">无url</div>`
                  }
                </div>
                <div class="px-2 py-1 text-[11px] text-slate-500 flex items-center justify-between">
                  <span class="font-mono">#${idx + 1}</span>
                  <button type="button" class="text-rose-600 hover:text-rose-700" data-sales-attr-remove-img="${row.key}" data-sales-attr-img-idx="${idx}">
                    <i class="fas fa-xmark"></i>
                  </button>
                </div>
              </div>
            `;
          })
          .join("");

        return `
          <div class="rounded-2xl border border-slate-100 bg-white p-4 space-y-3" data-sales-attr-row="${row.key}">
            <div class="grid grid-cols-1 lg:grid-cols-[160px,1fr,auto] gap-2 items-center">
              <select class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white" data-sales-attr-select>
                <option value="">请选择销售属性</option>
                ${options}
              </select>
              <input class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white" placeholder="销售属性值" value="${escapeHtml(
                row.value || ""
              )}" data-sales-attr-value />
              <div class="flex items-center gap-2 justify-end">
                <button type="button" class="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 whitespace-nowrap" data-sales-attr-record="${row.key}">记录</button>
                <button type="button" class="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 whitespace-nowrap" data-sales-attr-upload="${row.key}">上传图片</button>
                <button type="button" class="px-2 py-1.5 rounded-xl text-xs text-slate-400 hover:text-rose-600" data-sales-attr-remove="${row.key}"><i class="fas fa-trash"></i></button>
              </div>
            </div>
            <div class="text-[11px] text-slate-400" data-sales-attr-msg="${row.key}">${escapeHtml(row.msg || "")}</div>
            <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              ${imgHtml || '<div class="text-[11px] text-slate-400">暂无图片（最多 3 张）</div>'}
            </div>
          </div>
        `;
      })
      .join("");

    salesAttrBlock.innerHTML = `
      <div class="rounded-2xl border border-slate-100 bg-white p-4 space-y-3">
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <i class="fas fa-tags text-slate-500"></i>
            <span>销售属性图</span>
          </div>
          <label class="flex items-center gap-2 text-xs text-slate-500">
            <input id="tiktok-sales-attr-toggle" type="checkbox" class="sr-only peer" ${salesAttrEnabled ? "checked" : ""} />
            <div class="w-10 h-5 rounded-full bg-slate-200 peer-checked:bg-emerald-500 relative transition">
              <span class="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition peer-checked:translate-x-5"></span>
            </div>
            <span>${salesAttrEnabled ? "已启用" : "未启用"}</span>
          </label>
        </div>
        <div class="text-[11px] text-slate-400">提示：先选择销售属性并填写值，再上传图片；每个属性值最多 3 张。</div>
        <div class="space-y-3 ${salesAttrEnabled ? "" : "hidden"}" data-sales-attr-body>
          ${rowsHtml}
          <button type="button" class="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50" data-sales-attr-add>
            <i class="fas fa-plus mr-1"></i>添加销售属性值
          </button>
        </div>
      </div>
    `;
  };

  const uploadCertFiles = async (certId, files) => {
    const id = String(certId ?? "").trim();
    if (!id) return;
    if (certUploadInFlight) {
      setCertMsg(id, "正在上传，请稍后...", "info");
      return;
    }
    const current = getCertUploads(id);
    const remaining = Math.max(0, MAX_CERT_IMAGES - current.length);
    if (remaining <= 0) {
      setCertMsg(id, `最多 ${MAX_CERT_IMAGES} 张图片`, "error");
      return;
    }
    const list = Array.from(files || []).filter(Boolean);
    const imageFiles = list.filter((file) => isImageFile(file));
    if (!imageFiles.length) {
      setCertMsg(id, "请上传图片文件", "error");
      return;
    }
    const slice = imageFiles.slice(0, remaining);
    if (slice.length < imageFiles.length) {
      setCertMsg(id, `最多 ${MAX_CERT_IMAGES} 张图片，已自动截取`, "info");
    } else {
      setCertMsg(id, "");
    }
    certUploadInFlight = true;
    try {
      for (const file of slice) {
        const form = new FormData();
        form.append("file", file);
        form.append("use_case", "CERTIFICATION_IMAGE");
        const res = await postAuthedFormData("/api/tiktok/upload_tiktok_img", form);
        if (String(res?.code) === "2") {
          clearAuth();
          window.location.href = "/login.html";
          return;
        }
        if (String(res?.code) !== "0" || !res?.data) {
          setCertMsg(id, res?.msg || "证书上传失败", "error");
          continue;
        }
        const data = { ...res.data };
        if (!data.use_case) data.use_case = "CERTIFICATION_IMAGE";
        const next = getCertUploads(id);
        next.push(data);
        certificationUploads.set(id, next.slice(0, MAX_CERT_IMAGES));
        syncExtraWithCerts();
        renderCertifications();
      }
      setCertMsg(id, "上传完成", "success");
    } catch {
      setCertMsg(id, "网络异常，请稍后重试。", "error");
    } finally {
      certUploadInFlight = false;
    }
  };


  const runTikTokSelfCheck = () => {
    if (!selfCheckMsg) return;
    const required = [
      ["tiktok-cat-id", "cat_id"],
      ["tiktok-goods-name", "goods_name"],
      ["tiktok-goods-sn", "goods_sn"],
      ["tiktok-goods-brief", "goods_brief"],
      ["tiktok-package-weight", "package_weight"],
      ["tiktok-package-weight-unit", "package_weight_unit"],
      ["tiktok-package-width", "package_width"],
      ["tiktok-package-height", "package_height"],
      ["tiktok-package-length", "package_length"],
      ["tiktok-sku-price", "sku_price"],
      ["tiktok-sku-stock", "sku_stock"],
      ["tiktok-sku-identifier-code", "sku_identifier_code"],
    ];
    const missing = required
      .map(([id, label]) => [label, document.getElementById(id)?.value?.trim() || ""])
      .filter(([, v]) => !v)
      .map(([label]) => label);

    const issues = [];
    if (missing.length) issues.push(`缺少必填：${missing.join("，")}`);

    try {
      const attrs = document.getElementById("tiktok-attrs-json")?.value?.trim();
      const arr = attrs ? JSON.parse(attrs) : [];
      if (!Array.isArray(arr) || !arr.length) issues.push("属性模板为空，请先获取并选择属性");
    } catch {
      issues.push("属性 JSON 解析失败");
    }

    try {
      const imgsRaw = document.getElementById("tiktok-img-json")?.value?.trim();
      if (!imgsRaw) issues.push("缺少商品图片（goods_img_json）");
      else {
        const parsed = JSON.parse(imgsRaw);
        const count = Array.isArray(parsed) ? parsed.length : parsed && typeof parsed === "object" ? 1 : 0;
        if (!count) issues.push("商品图片格式不正确或为空");
      }
    } catch {
      issues.push("图片 JSON 解析失败");
    }

    const missingCerts = getRequiredCertMissing();
    if (missingCerts.length) {
      const names = missingCerts.map((c) => c.name || c.id).filter(Boolean);
        const label = names.length ? names.slice(0, 6).join("\\u3001") : "\\u8bc1\\u4e66";
        showUploadMsg(`\\u8bf7\\u5148\\u4e0a\\u4f20\\u8bc1\\u4e66\\uff1a${label}`);
    }
    renderTikTokStepper();

    selfCheckMsg.classList.remove("hidden");
    if (!issues.length) {
      selfCheckMsg.className =
        "mt-2 text-xs px-3 py-2 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700";
      selfCheckMsg.textContent = "自检通过：核心字段、属性、图片已就绪，可提交。";
    } else {
      selfCheckMsg.className =
        "mt-2 text-xs px-3 py-2 rounded-xl border border-amber-200 bg-amber-50 text-amber-700";
      selfCheckMsg.textContent = `自检未通过：${issues.join("；")}`;
    }
  };

  if (selfCheckBtn) selfCheckBtn.addEventListener("click", runTikTokSelfCheck);

  if (imagePreview) {
    imagePreview.addEventListener("click", (e) => {
      const btn = e.target?.closest?.(".tiktok-img-remove");
      if (!btn) return;
      const idx = Number(btn.dataset.idx);
      if (!Number.isFinite(idx) || idx < 0) return;
      const list = parseTikTokImgJson();
      list.splice(idx, 1);
      writeTikTokImgJson(list);
      renderTikTokImagePreview();
    });
  }

  const clearAll = () => {
    setPre(templatePre, "");
    setPre(uploadPre, "");
    showBrandSummary("");
    if (brandList) brandList.innerHTML = "";
    setPre(warehousesPre, "");
    setPre(createPre, "");
    showTemplateMsg("");
    showUploadMsg("");
    if (selfCheckMsg) selfCheckMsg.classList.add("hidden");
    [
      "tiktok-goods-name",
      "tiktok-goods-sn",
      "tiktok-goods-brief",
      "tiktok-attrs-json",
      "tiktok-img-json",
      "tiktok-extra-json",
      "tiktok-sku-stock",
      "tiktok-sku-price",
      "tiktok-sku-identifier-type",
      "tiktok-sku-identifier-code",
      "tiktok-sku-sn",
      "tiktok-ali-seller-sn",
      "tiktok-attr-attrid",
      "tiktok-attr-type-id",
      "tiktok-attr-type-name",
      "tiktok-attr-value",
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });
    const unit = document.getElementById("tiktok-unit");
    if (unit) unit.value = "KILOGRAM";
    if (fileInput) fileInput.value = "";
    if (salesAttrFileInput) salesAttrFileInput.value = "";
    updateAttrEntryVisibility(false);
    selectedAttrs.clear();
    resetTemplateState({ keepAttrs: false });
    salesAttrEnabled = false;
    salesAttrRows = [];
    renderSalesAttrBlock();
    renderAttrSummary();
    writeTikTokImgJson([]);
    uploadQueue.length = 0;
    uploadPendingCount = 0;
    uploadInFlight = false;
    updateUploadButtonState();
    renderTikTokImagePreview();
    clearDraft();
    draftState = null;
    draftApplied = false;
    unlockedUploadStep = 1;
    setUploadStep(1);
    buildCategorySelector("tiktok-cat-select", "tiktok", "tiktok-cat-id", {
      restore: false,
      persist: false,
      initialState: null,
    });
    refreshTemplateEnabled();
    if (typeof setBrandDropdown === "function") setBrandDropdown(false);
  };

  if (reset) reset.addEventListener("click", clearAll);

  const bindDraftInputs = () => {
    DRAFT_FIELD_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("input", queueDraftSave);
      el.addEventListener("change", queueDraftSave);
    });
  };
  bindDraftInputs();

  // TikTok goods list (goods.php?action=lists, is_tiktok=1)
  const listKeywords = document.getElementById("tiktok-goods-keywords");
  const listRefresh = document.getElementById("tiktok-goods-refresh");
  const listSummary = document.getElementById("tiktok-goods-summary");
  const listPrev = document.getElementById("tiktok-goods-prev");
  const listNext = document.getElementById("tiktok-goods-next");
  const listPageEl = document.getElementById("tiktok-goods-page");
  const listPageInput = document.getElementById("tiktok-goods-page-input");
  const listPageGo = document.getElementById("tiktok-goods-page-go");
  const listSize = document.getElementById("tiktok-goods-size");
  const listTbody = document.getElementById("tiktok-goods-tbody");

  let listPage = 1;
  let listTotal = 0;

  const readListSize = () => {
    let v = Number(listSize?.value || 15);
    if (!Number.isFinite(v) || v <= 0) v = 15;
    v = Math.floor(v);
    v = Math.max(1, Math.min(200, v));
    return v;
  };

  const setListPager = () => {
    const size = readListSize();
    const pages = size > 0 ? Math.max(1, Math.ceil(listTotal / size)) : 1;
    if (listPageEl) listPageEl.textContent = `第 ${listPage} / ${pages} 页`;
    if (listPrev) listPrev.disabled = listPage <= 1;
    if (listNext) listNext.disabled = listPage >= pages;
  };

  const renderTikTokGoodsRows = (list) => {
    if (!listTbody) return;
    if (!Array.isArray(list) || !list.length) {
      listTbody.innerHTML =
        '<tr class="table-row-hover transition"><td class="px-6 py-10 text-center text-xs text-slate-400" colspan="8">暂无数据</td></tr>';
      return;
    }
    listTbody.innerHTML = list
      .map((g, idx) => {
        const border = idx === list.length - 1 ? "" : "border-b border-slate-50";
        const goodsId = g?.goods_id ?? "-";
        const name = g?.goods_name ?? "-";
        const sn = g?.goods_sn ?? "-";
        const thumb = safeExternalUrl(
          resolveTopmAssetUrl(g?.goods_thumb ?? g?.goods_image ?? g?.goods_img ?? g?.img ?? "")
        );
        const url = safeExternalUrl(g?.url);
        const time = g?.formated_add_time ?? g?.add_time ?? "-";
        const onSale = String(g?.is_on_sale ?? "");
        const review = String(g?.review_status ?? "");
        const price = g?.formated_shop_price ?? g?.shop_price ?? "-";

        const saleBadge =
          onSale === "1"
            ? statusBadge("在售", "border-emerald-200 bg-emerald-50 text-emerald-700")
            : statusBadge("未上架", "border-rose-200 bg-rose-50 text-rose-700");
        const reviewMeta = mapReviewBadge(review);
        const reviewBadge = statusBadge(reviewMeta.name, reviewMeta.cls);

        const openAttr = url ? `data-open-url="${escapeHtml(url)}" title="打开链接"` : "";
        const nameHtml = url
          ? `<button type="button" ${openAttr} class="text-left text-xs font-black text-slate-900 hover:text-accent whitespace-normal break-words">${escapeHtml(
              name,
            )}</button>`
          : `<div class="text-xs font-black text-slate-900 whitespace-normal break-words">${escapeHtml(name || "未命名品牌")}</div>`;
        const thumbHtml = (() => {
          const wrap = (inner) =>
            url ? `<button type="button" ${openAttr} class="block">${inner}</button>` : inner;
          if (!thumb) {
            return wrap(
              '<div class="w-16 h-16 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center text-xs text-slate-400"><i class="fas fa-image"></i></div>',
            );
          }
          // Use <img> (not background-image) so we can set referrerpolicy to avoid hotlink blocks.
          const inner = `
            <div class="w-16 h-16 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden flex-shrink-0">
              <img src="${escapeHtml(thumb)}" alt="thumb" loading="lazy" referrerpolicy="no-referrer"
                   class="w-full h-full object-cover"
                   onerror="this.remove();" />
            </div>
          `;
          return wrap(inner);
        })();

        const editBtn = `
          <button type="button" class="tiktok-edit inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-black text-slate-700" data-tiktok-edit-id="${escapeHtml(
            goodsId
          )}">
            <i class="fas fa-pen-to-square text-slate-500"></i>
            <span>编辑</span>
          </button>
        `;
        const toggleBtn = `
          <button type="button" class="tiktok-toggle-sale inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-black text-slate-700" data-goods-id="${escapeHtml(
            goodsId
          )}" data-next-val="${onSale === "1" ? "0" : "1"}">
            <i class="fas ${onSale === "1" ? "fa-toggle-on text-emerald-600" : "fa-toggle-off text-slate-400"} text-lg"></i>
            <span>${onSale === "1" ? "下架" : "上架"}</span>
          </button>
        `;
        const actions = `<div class="flex items-center justify-end gap-2">${editBtn}${toggleBtn}</div>`;

        return `
          <tr class="table-row-hover ${border} transition">
            <td class="px-6 py-4 font-medium text-slate-900">${escapeHtml(goodsId)}</td>
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
            <td class="px-6 py-4 whitespace-nowrap">${reviewBadge}</td>
            <td class="px-6 py-4 text-right text-xs font-black text-slate-900">${escapeHtml(price)}</td>
            <td class="px-6 py-4 text-xs text-slate-500">${escapeHtml(time)}</td>
            <td class="px-6 py-4 text-right">${actions}</td>
          </tr>
        `;
      })
      .join("");
  };

  const loadTikTokGoodsList = async () => {
    if (listRefresh) {
      listRefresh.disabled = true;
      listRefresh.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-1"></i>加载中...';
    }
    setTableLoading("tiktok-goods-tbody", 8);
    if (listSummary) listSummary.textContent = "加载中...";
    try {
      const keywords = listKeywords?.value?.trim() || "";
      const size = readListSize();
      const res = await postAuthedJson("/api/goods/lists", {
        page: listPage,
        size,
        is_tiktok: 1,
        ...(keywords ? { keywords } : {}),
      });

      if (String(res?.code) === "2") {
        clearAuth();
        window.location.href = "/login.html";
        return;
      }
      if (String(res?.code) !== "0") {
        renderTikTokGoodsRows([]);
        if (listSummary) listSummary.textContent = res?.msg || "加载失败";
        listTotal = 0;
        setListPager();
        return;
      }

      const list = Array.isArray(res?.data?.list) ? res.data.list : [];
      listTotal = Number(res?.data?.num ?? list.length) || list.length;
      renderTikTokGoodsRows(list);
      if (listSummary) listSummary.textContent = `本页 ${list.length} 条 · 共 ${listTotal} 条`;
      setListPager();
    } catch {
      renderTikTokGoodsRows([]);
      if (listSummary) listSummary.textContent = "网络异常，请稍后重试。";
      listTotal = 0;
      setListPager();
    } finally {
      if (listRefresh) {
        listRefresh.disabled = false;
        listRefresh.innerHTML = '<i class="fas fa-magnifying-glass mr-1"></i>搜索';
      }
    }
  };

  if (listRefresh) {
    listRefresh.addEventListener("click", () => {
      listPage = 1;
      loadTikTokGoodsList();
    });
  }
  if (listKeywords) {
    listKeywords.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      listPage = 1;
      loadTikTokGoodsList();
    });
  }
  if (listSize) {
    listSize.addEventListener("blur", () => {
      const nextSize = readListSize();
      listSize.value = String(nextSize);
      listPage = 1;
      loadTikTokGoodsList();
    });
  }
  if (listPrev) {
    listPrev.addEventListener("click", () => {
      listPage = Math.max(1, listPage - 1);
      loadTikTokGoodsList();
    });
  }
  if (listNext) {
    listNext.addEventListener("click", () => {
      listPage += 1;
      loadTikTokGoodsList();
    });
  }
  if (listPageGo) {
    listPageGo.addEventListener("click", () => {
      const v = Number(listPageInput?.value || 1) || 1;
      listPage = Math.max(1, Math.floor(v));
      loadTikTokGoodsList();
    });
  }
  if (listPageInput) {
    listPageInput.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      const v = Number(listPageInput.value || 1) || 1;
      listPage = Math.max(1, Math.floor(v));
      loadTikTokGoodsList();
    });
  }

  if (listTbody) {
    listTbody.addEventListener("click", async (e) => {
      const editBtn = e.target?.closest?.(".tiktok-edit");
      if (editBtn) {
        const goodsId = String(editBtn.dataset.tiktokEditId ?? "").trim();
        if (!goodsId) return;
        try {
          window.sessionStorage.setItem("topm:tiktok-edit-id", goodsId);
        } catch {
          // ignore
        }
        setSubView("upload", { updateHash: true });
        return;
      }

      const btn = e.target?.closest?.(".tiktok-toggle-sale");
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
          if (listSummary) listSummary.textContent = res?.msg || "操作失败";
          return;
        }
        if (listSummary) listSummary.textContent = res?.msg || "操作成功";
        await loadTikTokGoodsList();
      } catch {
        if (listSummary) listSummary.textContent = "网络异常，请稍后重试。";
      } finally {
        btn.dataset.pending = "0";
        btn.classList.remove("opacity-70");
        btn.innerHTML = originalHtml;
      }
    });
  }

  loadTikTokGoodsList();

  const setAttrSelection = (attrId, value, goodsAttrId, opts = {}) => {
    const id = normalizeAttrId(attrId);
    const v = String(value ?? "").trim();
    const multiple = Boolean(opts.multiple);
    if (!id || !v || !goodsAttrId) return;
    const bucket = getSelectedBucket(id);
    if (!bucket) return;
    if (!multiple) bucket.values = [];
    const exists = bucket.values.some((item) => String(item?.value ?? "").trim() === v);
    if (!exists) bucket.values.push({ value: v, goods_attr_id: String(goodsAttrId) });
    selectedAttrs.set(id, bucket);
    let current = parseTikTokAttrsJson();
    current = current.filter((x) => {
      const xId = String(x?.attrId ?? x?.attr_id ?? "").trim();
      if (xId !== id) return true;
      if (!multiple) return false;
      const xVal = String(x?.attr_value_name ?? x?.value ?? "").trim();
      return xVal !== v;
    });
    current.push({
      attrId: Number.isFinite(Number(id)) ? Number(id) : id,
      attr_value_id: String(goodsAttrId),
      attr_value_name: v,
    });
    writeTikTokAttrsJson(current);
    renderAttrSummary();
    renderTikTokStepper({ autoAdvance: true });
    queueDraftSave();
  };

  const removeAttrSelection = (attrId, value) => {
    const id = normalizeAttrId(attrId);
    const v = String(value ?? "").trim();
    if (!id || !v) return;
    const bucket = selectedAttrs.get(id);
    if (bucket?.values) {
      bucket.values = bucket.values.filter((item) => String(item?.value ?? "").trim() !== v);
    }
    if (!bucket?.values?.length) selectedAttrs.delete(id);
    const current = parseTikTokAttrsJson().filter((x) => {
      const xId = String(x?.attrId ?? x?.attr_id ?? "").trim();
      if (xId !== id) return true;
      const xVal = String(x?.attr_value_name ?? x?.value ?? "").trim();
      return xVal !== v;
    });
    writeTikTokAttrsJson(current);
    renderAttrSummary();
    renderTikTokStepper();
    queueDraftSave();
  };

  const clearAttrSelection = (attrId) => {
    const id = normalizeAttrId(attrId);
    if (!id) return;
    selectedAttrs.delete(id);
    const current = parseTikTokAttrsJson().filter((x) => String(x?.attrId ?? x?.attr_id ?? "").trim() !== id);
    writeTikTokAttrsJson(current);
    renderAttrSummary();
    renderTikTokStepper();
    queueDraftSave();
  };

  const normalizeTikTokValues = (raw) => {
    const pickList = (val) => {
      if (Array.isArray(val)) return val;
      if (val && typeof val === "object") {
        if (Array.isArray(val.list)) return val.list;
        if (Array.isArray(val.values)) return val.values;
      }
      return null;
    };
    const candidates = [
      raw?.values,
      raw?.value_list,
      raw?.valueList,
      raw?.value_arr,
      raw?.valueArr,
      raw?.attr_value_list,
      raw?.attrValueList,
      raw?.attr_values,
      raw?.attrValues,
      raw?.property_value_list,
      raw?.propertyValueList,
      raw?.options,
      raw?.option_list,
      raw?.optionList,
      raw?.items,
      raw?.list,
    ];
    let list = [];
    for (const c of candidates) {
      const found = pickList(c);
      if (found) {
        list = found;
        break;
      }
    }
    if (!Array.isArray(list) || !list.length) return [];
    return list
      .map((v) => {
        if (v == null) return null;
        if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") {
          const label = String(v);
          return { name: label, value: label };
        }
        if (typeof v === "object") {
          const label =
            v.name ??
            v.value ??
            v.label ??
            v.title ??
            v.text ??
            v.id ??
            v.vid ??
            v.value_id ??
            v.valueId ??
            v.valueID;
          return { ...v, name: label != null ? String(label) : "" };
        }
        return null;
      })
      .filter((v) => v && String(v.name ?? "").trim());
  };

  const getTikTokTemplateItems = () => {
    const res = lastTemplateRes;
    if (String(res?.code ?? "") !== "0") return [];
    const data = res?.data || {};
    const attrs = Array.isArray(data?.product_attr_arr) ? data.product_attr_arr : [];
    const items = [];
    for (const a of attrs) {
      const id = a?.id;
      const name = a?.name;
      if (id == null || name == null) continue;
      const multipleFlag = a?.is_multiple_selection;
      const multiple = multipleFlag === true || multipleFlag === 1 || multipleFlag === "1";
      items.push({
        id: String(id),
        name: String(name),
        required: a?.is_requried === true,
        multiple,
        type: String(a?.type ?? ""),
        is_customizable: a?.is_customizable ?? a?.is_customize ?? a?.isCustomizable,
        values: normalizeTikTokValues(a),
      });
    }
    // required first
    items.sort((a, b) => (a.required === b.required ? a.name.localeCompare(b.name, "zh-CN") : a.required ? -1 : 1));
    return items;
  }
  const getTikTokSalesItems = () => {
    const res = lastTemplateRes;
    if (String(res?.code ?? "") !== "0") return [];
    const data = res?.data || {};
    const sales = Array.isArray(data?.pro_main_arr) ? data.pro_main_arr : [];
    return sales
      .map((s) => {
        const id = s?.attribute_id ?? s?.attr_id ?? s?.id;
        const name = s?.attribute_name ?? s?.attribute_name_en ?? s?.name ?? id;
        if (id == null || name == null) return null;
        return { id: String(id), name: String(name) };
      })
      .filter((s) => s && s.id);
  };

  const normalizeSalesAttrName = (val) => String(val ?? "").trim();

  const setSalesAttrNameMsg = (text, tone = "info") => {
    if (!salesAttrMsg) return;
    salesAttrMsg.textContent = text || "";
    const base = "text-[11px]";
    if (tone === "error") {
      salesAttrMsg.className = `${base} text-rose-600`;
    } else if (tone === "ok") {
      salesAttrMsg.className = `${base} text-emerald-600`;
    } else {
      salesAttrMsg.className = `${base} text-slate-400`;
    }
  };

  const clearSalesAttrSelections = () => {
    salesAttrSelections.clear();
    skuDraft.clear();
    activeSkuKey = "";
    renderTikTokSalesAttrs();
    renderTikTokSalesAttrValues();
    renderTikTokSkuGrid();
  };

  const renderTikTokSalesAttrs = () => {
    if (!salesAttrNamesEl) return;
    const items = getTikTokSalesItems().slice().sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
    const selectedIds = new Set(Array.from(salesAttrSelections.keys()));
    const customItems = Array.from(salesAttrSelections.values()).filter((it) => it && it.custom);

    if (!items.length && !customItems.length) {
      salesAttrNamesEl.innerHTML = '<span class="text-[11px] text-slate-400">暂无销售属性</span>';
      setSalesAttrNameMsg("未返回销售属性，可手动添加自定义名称。", "info");
      return;
    }

    const btns = items.map((item) => {
      const active = selectedIds.has(item.id);
      const cls = active
        ? "border-accent bg-accent/10 text-accent"
        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50";
      return `<button type="button" data-sales-spec-id="${escapeHtml(item.id)}" class="px-3 py-1.5 rounded-full text-xs font-semibold border ${cls}">${escapeHtml(
        item.name
      )}</button>`;
    });

    const customBtns = customItems.map((item) => {
      const label = `${item.name}（自定义）`;
      return `<button type="button" data-sales-spec-id="${escapeHtml(
        item.id
      )}" class="px-3 py-1.5 rounded-full text-xs font-semibold border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100">${escapeHtml(
        label
      )}</button>`;
    });

    salesAttrNamesEl.innerHTML = [...btns, ...customBtns].join("");

    const count = salesAttrSelections.size;
    if (count === 0) {
      setSalesAttrNameMsg(`请选择销售属性名称（最多 ${MAX_SALES_ATTR_NAMES} 个）。`, "info");
    } else if (count >= MAX_SALES_ATTR_NAMES) {
      setSalesAttrNameMsg(`已选择 ${count} 个销售属性名称（最多 ${MAX_SALES_ATTR_NAMES} 个）。`, "ok");
    } else {
      setSalesAttrNameMsg(`已选择 ${count} 个销售属性名称，可再选择 ${MAX_SALES_ATTR_NAMES - count} 个。`, "info");
    }
  };

  const renderTikTokSalesAttrValues = () => {
    if (!salesAttrValuesEl) return;
    const selections = Array.from(salesAttrSelections.values());
    if (!selections.length) {
      salesAttrValuesEl.innerHTML = '<div class="text-[11px] text-slate-400">先选择销售属性名称，再添加属性值。</div>';
      return;
    }
    salesAttrValuesEl.innerHTML = selections
      .map((sel) => {
        const values = Array.isArray(sel.values) ? sel.values : [];
        const chips = values
          .map(
            (v) => `
              <span class="inline-flex items-center gap-2 text-[11px] bg-slate-100 border border-slate-200 text-slate-600 px-2 py-1 rounded-full">
                <span>${escapeHtml(v.value)}</span>
                <button type="button" data-sales-value-remove="${escapeHtml(sel.id)}" data-sales-value-id="${escapeHtml(
              v.goods_attr_id
            )}" class="text-rose-600 hover:text-rose-700">
                  <i class="fas fa-xmark"></i>
                </button>
              </span>
            `
          )
          .join("");
        return `
          <div class="bg-white border border-slate-100 rounded-2xl p-4 space-y-3" data-sales-block="${escapeHtml(sel.id)}">
            <div class="flex items-center justify-between">
              <div class="text-xs font-bold text-slate-700">${escapeHtml(sel.name)}</div>
              <div class="text-[11px] text-slate-400">已添加 ${values.length} 个</div>
            </div>
            <div class="flex flex-col sm:flex-row gap-2">
              <input data-sales-value-input="${escapeHtml(sel.id)}" class="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white" placeholder="填写属性值" />
              <button type="button" data-sales-value-add="${escapeHtml(
                sel.id
              )}" class="px-3 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800">添加</button>
            </div>
            <div class="flex flex-wrap gap-2">${chips || '<span class="text-[11px] text-slate-400">未添加值</span>'}</div>
          </div>
        `;
      })
      .join("");
  };

  const getTikTokSalesCombos = () => {
    const selections = Array.from(salesAttrSelections.values());
    if (!selections.length) return [];
    const lists = selections.map((sel) =>
      (Array.isArray(sel.values) ? sel.values : []).map((v) => ({
        specId: sel.id,
        specName: sel.name,
        value: v.value,
        goods_attr_id: String(v.goods_attr_id ?? "").trim(),
      }))
    );
    if (lists.some((l) => l.length === 0)) return [];
    return lists.reduce((acc, list) => acc.flatMap((prev) => list.map((cur) => prev.concat([cur]))), [[]]);
  };

  const normalizeGoodsAttrKey = (raw) => {
    const list = String(raw ?? "")
      .split(",")
      .map((x) => String(x ?? "").trim())
      .filter(Boolean);
    if (!list.length) return "";
    return Array.from(new Set(list)).sort().join(",");
  };

  const isSkuComplete = (row, opts = {}) => {
    if (!row) return false;
    const mode = opts?.mode || (salesModeEnabled ? "full" : "simple");
    if (mode === "simple") {
      const required = ["product_number", "product_price"];
      return !required.some((k) => !String(row?.[k] ?? "").trim());
    }
    const required = ["product_sn", "product_number", "product_price"];
    if (required.some((k) => !String(row?.[k] ?? "").trim())) return false;
    const images = Array.isArray(row.attr_img_list) ? row.attr_img_list : [];
    return images.length > 0;
  };

  const renderTikTokSkuGrid = () => {
    if (!skuGridEl) return;
    const combos = getTikTokSalesCombos();
    if (!salesAttrSelections.size) {
      skuGridEl.innerHTML = '<div class="text-[11px] text-slate-400">请选择销售属性名称。</div>';
      renderTikTokStepper();
      return;
    }
    if (!combos.length) {
      skuGridEl.innerHTML = '<div class="text-[11px] text-slate-400">请为已选属性添加值，自动生成组合。</div>';
      renderTikTokStepper();
      return;
    }

    skuGridEl.innerHTML = combos
      .map((combo) => {
        const goodsAttrs = normalizeGoodsAttrKey(combo.map((x) => x.goods_attr_id).join(","));
        const label = combo.map((x) => `${x.specName}: ${x.value}`).join(" / ");
        if (!skuDraft.has(goodsAttrs)) {
          skuDraft.set(goodsAttrs, {
            sku_identifier_type: "GTIN",
            sku_identifier_code: "",
            product_sn: "",
            product_number: "",
            product_price: "",
            attr_img_list: [],
          });
        }
        const row = skuDraft.get(goodsAttrs);
        const complete = isSkuComplete(row);
        const badge = complete
          ? '<span class="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-black">已完成</span>'
          : '<span class="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-black">未完成</span>';
        return `
          <button type="button" data-sku-edit="${escapeHtml(goodsAttrs)}" data-sku-label="${escapeHtml(
          label
        )}" class="w-full text-left border border-slate-100 rounded-2xl p-4 bg-white shadow-soft flex items-center justify-between gap-3 hover:border-accent/40 hover:shadow-glow transition">
            <div class="min-w-0">
              <div class="text-xs font-semibold text-slate-700 truncate">${escapeHtml(label)}</div>
              <div class="text-[11px] text-slate-500 mt-1">排列组合</div>
            </div>
            <div class="flex items-center gap-2">
              ${badge}
            </div>
          </button>
        `;
      })
      .join("");
    renderTikTokStepper();
  };

  const pickTikTokImageUrls = (data) => {
    const urls = [];
    const push = (u) => {
      const s = String(u ?? "").trim();
      if (s) urls.push(s);
    };
    const d = data ?? {};
    push(d.url);
    push(d.uri);
    push(d.img_url);
    push(d.imgUrl);
    push(d.file_path);
    push(d.filePath);
    push(d.full_url);
    if (Array.isArray(d.images)) d.images.forEach((x) => push(x?.url ?? x?.uri ?? x));
    if (typeof d === "string") push(d);
    return urls.filter(Boolean);
  };

  const uploadTikTokSkuAttrImage = async (file) => {
    if (!file || !isImageFile(file)) {
      return { ok: false, msg: "请上传图片文件" };
    }
    const form = new FormData();
    form.append("file", file);
    form.append("use_case", "ATTRIBUTE_IMAGE");
    const res = await postAuthedFormData("/api/tiktok/upload_attrs_img", form);
    if (String(res?.code) === "2") {
      clearAuth();
      window.location.href = "/login.html";
      return { ok: false, msg: "未登录" };
    }
    if (String(res?.code) !== "0" || !res?.data) {
      return { ok: false, msg: res?.msg || "上传失败", res };
    }
    const urls = pickTikTokImageUrls(res?.data || {});
    return { ok: true, url: urls[0] || resolveTikTokUploadUrl(res?.data || {}), res };
  };

  const renderSkuModalImages = () => {
    if (!skuModalImages) return;
    const row = skuDraft.get(activeSkuKey) || {};
    const images = Array.isArray(row.attr_img_list) ? row.attr_img_list : [];
    skuModalImages.innerHTML =
      images
        .map((img, i) => {
          const uploading = Boolean(img?.uploading);
          const hasError = Boolean(img?.uploadError);
          const okBadge = img?.uploadedOk
            ? '<span class="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500 text-white text-[9px]" title="Upload OK"><i class="fas fa-check"></i></span>'
            : "";
          const statusBadge = uploading
            ? '<span class="inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-900 text-white text-[9px]" title="Uploading"><i class="fas fa-circle-notch fa-spin"></i></span>'
            : hasError
              ? '<span class="inline-flex items-center justify-center w-4 h-4 rounded-full bg-rose-500 text-white text-[9px]" title="Upload failed"><i class="fas fa-triangle-exclamation"></i></span>'
              : "";
          return `
            <div class="relative rounded-lg border border-slate-200 bg-white overflow-hidden">
              <button type="button" data-view-image="${escapeHtml(img.img_url || "")}" class="block w-16 h-16 bg-slate-50 relative">
                <img src="${escapeHtml(img.img_url || "")}" class="w-full h-full object-cover" alt="" />
                ${
                  uploading
                    ? '<span class="absolute inset-0 bg-white/70 flex items-center justify-center text-slate-700"><i class="fas fa-circle-notch fa-spin"></i></span>'
                    : ""
                }
              </button>
              <div class="absolute left-1 top-1 flex items-center gap-1">
                ${statusBadge}
                ${okBadge}
              </div>
              <button type="button" data-sku-modal-img-remove="${escapeHtml(activeSkuKey)}" data-sku-modal-img-idx="${i}" class="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center">
                <i class="fas fa-xmark"></i>
              </button>
            </div>
          `;
        })
        .join("") || '<span class="text-[11px] text-slate-400">暂无图片</span>';
  };

  const renderSkuModalStatus = () => {
    if (!skuModalStatus) return;
    const complete = isSkuComplete(skuDraft.get(activeSkuKey), { mode: skuModalMode });
    skuModalStatus.textContent = complete ? "已完成" : "未完成";
    skuModalStatus.className = complete
      ? "text-[11px] px-2 py-1 rounded-full border font-black text-emerald-700 bg-emerald-50 border-emerald-200"
      : "text-[11px] px-2 py-1 rounded-full border font-black text-amber-700 bg-amber-50 border-amber-200";
  };

  const setSkuModalMode = (mode) => {
    skuModalMode = mode === "simple" ? "simple" : "full";
    if (!skuModal) return;
    const hideFields = ["weight", "width", "height", "length"];
    hideFields.forEach((field) => {
      const input = skuModal.querySelector(`[data-sku-modal-field="${field}"]`);
      const wrap = input?.closest(".space-y-1");
      if (!wrap) return;
      const show = skuModalMode === "full";
      wrap.hidden = !show;
      wrap.classList.toggle("hidden", !show);
    });
    const imageWrap = skuModalImages?.closest(".space-y-2");
    if (imageWrap) {
      const show = skuModalMode === "full";
      imageWrap.hidden = !show;
      imageWrap.classList.toggle("hidden", !show);
    }
  };

  function openSkuModal(key, label) {
    if (!skuModal) return;
    setSkuModalMode("full");
    activeSkuKey = key;
    if (!skuDraft.has(key)) skuDraft.set(key, { attr_img_list: [] });
    const row = skuDraft.get(key);
    if (!String(row?.sku_identifier_type ?? "").trim()) row.sku_identifier_type = "GTIN";
    if (skuModalTitle) skuModalTitle.textContent = "SKU 组合配置";
    if (skuModalSubtitle) skuModalSubtitle.textContent = label || "-";
    skuModal.querySelectorAll("[data-sku-modal-field]").forEach((input) => {
      const field = input.getAttribute("data-sku-modal-field");
      let next = row?.[field] ?? "";
      if (field === "sku_identifier_type" && !String(next || "").trim()) next = "GTIN";
      input.value = next;
    });
    renderSkuModalImages();
    renderSkuModalStatus();
    skuModal.classList.remove("hidden");
  }

  const openPriceStockModal = () => {
    if (!skuModal) return;
    setSkuModalMode("simple");
    activeSkuKey = SIMPLE_SKU_KEY;
    if (!skuDraft.has(SIMPLE_SKU_KEY)) {
      skuDraft.set(SIMPLE_SKU_KEY, {
        sku_identifier_type: "GTIN",
        sku_identifier_code: "",
        product_sn: "",
        product_number: "",
        product_price: "",
        attr_img_list: [],
      });
    }
    const row = skuDraft.get(SIMPLE_SKU_KEY);
    if (!String(row?.sku_identifier_type ?? "").trim()) row.sku_identifier_type = "GTIN";
    if (skuModalTitle) skuModalTitle.textContent = "Price & Stock";
    if (skuModalSubtitle) skuModalSubtitle.textContent = "统一价格与库存";
    skuModal.querySelectorAll("[data-sku-modal-field]").forEach((input) => {
      const field = input.getAttribute("data-sku-modal-field");
      let next = row?.[field] ?? "";
      if (field === "sku_identifier_type" && !String(next || "").trim()) next = "GTIN";
      input.value = next;
    });
    renderSkuModalImages();
    renderSkuModalStatus();
    skuModal.classList.remove("hidden");
  };

  function closeSkuModal() {
    if (!skuModal) return;
    skuModal.classList.add("hidden");
    activeSkuKey = "";
  }

  const toggleSalesAttrSelection = (id, item) => {
    const key = String(id ?? "").trim();
    if (!key) return;
    if (salesAttrSelections.has(key)) {
      salesAttrSelections.delete(key);
      renderTikTokSalesAttrs();
      renderTikTokSalesAttrValues();
      renderTikTokSkuGrid();
      return;
    }
    if (salesAttrSelections.size >= MAX_SALES_ATTR_NAMES) {
      setSalesAttrNameMsg(`最多选择 ${MAX_SALES_ATTR_NAMES} 个销售属性名称。`, "error");
      return;
    }
    const payload = item || { id: key, name: key, custom: true, values: [] };
    salesAttrSelections.set(key, { ...payload, values: Array.isArray(payload.values) ? payload.values : [] });
    renderTikTokSalesAttrs();
    renderTikTokSalesAttrValues();
    renderTikTokSkuGrid();
  };

  const addCustomSalesAttrName = () => {
    if (!salesAttrCustomInput) return;
    const name = normalizeSalesAttrName(salesAttrCustomInput.value);
    if (!name) {
      setSalesAttrNameMsg("请输入自定义销售属性名称。", "error");
      return;
    }
    const items = getTikTokSalesItems();
    const hit = items.find((it) => normalizeSalesAttrName(it.name).toLowerCase() === name.toLowerCase());
    if (hit) {
      toggleSalesAttrSelection(hit.id, { ...hit, custom: false, values: salesAttrSelections.get(hit.id)?.values || [] });
      salesAttrCustomInput.value = "";
      return;
    }
    const id = `custom:${name}`;
    toggleSalesAttrSelection(id, { id, name, custom: true, values: [] });
    salesAttrCustomInput.value = "";
  };

  const syncTemplateDependencies = (res) => {
    lastAttrIndex = new Map();
    const data = res?.data || {};
    const attrs = Array.isArray(data?.product_attr_arr) ? data.product_attr_arr : [];

    for (const a of attrs) {
      const id = a?.id;
      const name = a?.name;
      if (id == null || name == null) continue;
      lastAttrIndex.set(String(id), { kind: "product", raw: a });
    }
    // Only keep product_attr_arr for TikTok template display.

    if (tplAttrSel) {
      tplAttrSel.innerHTML = '<option value="">从模板选择属性（可选）</option>';
      const options = [];
      for (const [id, item] of lastAttrIndex.entries()) {
        const raw = item.raw || {};
        const name = raw.name ?? raw.attribute_name ?? raw.attribute_name_en ?? id;
        const req = raw.is_requried === true ? " *" : "";
        const type = raw.type ? ` (${raw.type})` : "";
        options.push({ id, label: `${name}${type}${req} [${id}]` });
      }
      options.sort((a, b) => a.label.localeCompare(b.label, "zh-CN"));
      for (const o of options) {
        const opt = document.createElement("option");
        opt.value = o.id;
        opt.textContent = o.label;
        tplAttrSel.appendChild(opt);
      }
    }

    if (tplValueSel) {
      tplValueSel.innerHTML = '<option value="">从模板选择属性值（可选）</option>';
    }

    if (brandResults) {
      const brands = res?.data?.brands;
      const list = Array.isArray(brands)
        ? brands
        : Array.isArray(brands?.list)
          ? brands.list
          : brands && typeof brands === "object"
            ? Object.values(brands)
            : [];
      if (list.length) {
        brandResults.innerHTML = '<option value="">选择品牌(模板返回)</option>';
        for (const b of list) {
          const opt = document.createElement("option");
          opt.value = String(b.id ?? b.brand_id ?? "");
          const label = `${b.name ?? b.id ?? "-"}`;
          opt.textContent = label;
          brandResults.appendChild(opt);
        }
      }
    }
    syncCertificationsFromTemplate(res);
  };

  const resetTemplateState = (opts = {}) => {
    const keepAttrs = opts.keepAttrs === true;
    selectedAttrs.clear();
    if (!keepAttrs) writeTikTokAttrsJson([]);
    renderAttrSummary();
    lastAttrIndex = new Map();
    lastTemplateRes = null;
    brandDefaultList = [];
    lastBrandList = [];
    if (templateForm) templateForm.innerHTML = "";
    if (tplAttrSel) tplAttrSel.innerHTML = '<option value="">从模板选择属性（可选）</option>';
    if (tplValueSel) tplValueSel.innerHTML = '<option value="">从模板选择属性值（可选）</option>';
    if (brandResults) brandResults.innerHTML = '<option value="">选择品牌(可选)</option>';
    if (brandList) brandList.innerHTML = "";
    showBrandSummary("");
    updateBrandSelectedHint();
    showTemplateMsg("");
    clearCertificationsState();
    clearSalesAttrSelections();
  };

  const getRequiredAttrMissing = () => {
    const items = getTikTokTemplateItems();
    const required = items.filter((x) => x.required);
    if (!required.length) return [];
    return required.filter((item) => {
      const id = String(item?.id ?? "").trim();
      if (!id) return false;
      const values = Array.isArray(item?.values) ? item.values : [];
      if (!values.length) return false;
      return getSelectedValues(id).length === 0;
    });
  };

  const getMissingDescFields = () => {
    const fields = [
      ["tiktok-goods-name", "商品名称"],
      ["tiktok-goods-sn", "商品货号"],
      ["tiktok-goods-brief", "商品描述"],
      ["tiktok-package-weight", "Package weight"],
      ["tiktok-package-weight-unit", "Package weight 单位"],
      ["tiktok-package-width", "宽(次长边)"],
      ["tiktok-package-height", "高(最短边)"],
      ["tiktok-package-length", "长(最长边)"],
    ];
    return fields
      .map(([id, label]) => [label, String(document.getElementById(id)?.value ?? "").trim()])
      .filter(([, val]) => !val)
      .map(([label]) => label);
  };

  const isDescOk = () => getMissingDescFields().length === 0;

  const isAllSkuCombosComplete = () => {
    if (!salesModeEnabled) {
      const row = skuDraft.get(SIMPLE_SKU_KEY);
      return isSkuComplete(row, { mode: "simple" });
    }
    if (!salesAttrSelections.size) return false;
    const combos = getTikTokSalesCombos();
    if (!combos.length) return false;
    return combos.every((combo) => {
      const key = normalizeGoodsAttrKey(combo.map((x) => x.goods_attr_id).join(","));
      const row = skuDraft.get(key);
      return isSkuComplete(row);
    });
  };

  const setPanelVisible = (el, show) => {
    if (!el) return;
    el.hidden = !show;
    if (show) el.classList.remove("hidden");
    else el.classList.add("hidden");
  };

  const setStepActiveStyle = (btn, dot, active) => {
    if (!btn || !dot) return;
    if (active) {
      btn.classList.add("ring-2", "ring-accent/30", "border-accent/40");
      dot.classList.remove("bg-slate-100", "text-slate-600");
      dot.classList.add("bg-accent/10", "text-accent");
    } else {
      btn.classList.remove("ring-2", "ring-accent/30", "border-accent/40");
      dot.classList.remove("bg-accent/10", "text-accent");
      dot.classList.add("bg-slate-100", "text-slate-600");
    }
  };

  const setStepEnabled = (btn, enabled) => {
    if (!btn) return;
    btn.disabled = !enabled;
    if (enabled) btn.classList.remove("opacity-50", "cursor-not-allowed");
    else btn.classList.add("opacity-50", "cursor-not-allowed");
  };

  const setStepDone = (checkEl, done) => {
    if (!checkEl) return;
    if (done) checkEl.classList.remove("hidden");
    else checkEl.classList.add("hidden");
  };

  const unlockToStep = (step) => {
    const s = Number(step) || 1;
    unlockedUploadStep = Math.max(unlockedUploadStep, s);
  };

  const getTikTokProgress = () => {
    const catOk = isCatSelected();
    const templateOk = String(lastTemplateRes?.code ?? "") === "0" && getTikTokTemplateItems().length > 0;
    const missingRequired = getRequiredAttrMissing();
    const attrsOk =
      templateOk &&
      missingRequired.length === 0 &&
      (getSelectedValueCount() > 0 || getTikTokTemplateItems().every((x) => !x.required));
    const missingCerts = getRequiredCertMissing();
    const certsOk = missingCerts.length === 0;
    const imagesOk = parseTikTokImgJson().length > 0;
    const descOk = isDescOk();
    const skuOk = isAllSkuCombosComplete();
    return {
      done1: catOk,
      done2: attrsOk,
      done3: imagesOk && certsOk,
      done4: descOk,
      done5: skuOk,
      allow2: catOk,
      allow3: attrsOk,
      allow4: imagesOk && certsOk,
      allow5: descOk,
    };
  };

  const renderTikTokStepper = () => {
    const p = getTikTokProgress();

    setStepDone(stepCheck1, unlockedUploadStep >= 1);
    setStepDone(stepCheck2, unlockedUploadStep >= 2);
    setStepDone(stepCheck3, unlockedUploadStep >= 3);
    setStepDone(stepCheck4, unlockedUploadStep >= 4);
    setStepDone(stepCheck5, p.done5);

    if (stepHint1) {
      const selectedText = String(document.getElementById("tiktok-cat-id-text")?.textContent ?? "").trim();
      if (!isCatSelected()) stepHint1.textContent = "请选择末级类目";
      else stepHint1.textContent = selectedText && selectedText !== "-" ? `已选类目：${selectedText}` : "已选类目";
    }
    if (stepHint2) stepHint2.textContent = p.done2 ? "模板已填写" : "属性模板与映射";
    if (stepHint3) stepHint3.textContent = p.done3 ? "图片已上传" : "上传主图/详情图";
    if (stepHint4) stepHint4.textContent = p.done4 ? "描述已填写" : "填写商品描述";
    if (stepHint5) stepHint5.textContent = p.done5 ? "组合已配置" : "请配置组合信息";

    setStepEnabled(stepBtn1, true);
    setStepEnabled(stepBtn2, unlockedUploadStep >= 2);
    setStepEnabled(stepBtn3, unlockedUploadStep >= 3);
    setStepEnabled(stepBtn4, unlockedUploadStep >= 4);
    setStepEnabled(stepBtn5, unlockedUploadStep >= 5);

    if (stepNext1) stepNext1.disabled = !p.allow2;
    if (stepNext2) stepNext2.disabled = !p.allow3;
    if (stepNext3) stepNext3.disabled = !p.allow4;
    if (stepNext4) {
      stepNext4.disabled = false;
      stepNext4.classList.toggle("opacity-50", !p.allow5);
      stepNext4.classList.toggle("cursor-not-allowed", !p.allow5);
      stepNext4.dataset.allow = p.allow5 ? "1" : "0";
    }
  };

  const setUploadStep = (step) => {
    let s = Number(step);
    if (!Number.isFinite(s)) s = 1;
    s = Math.max(1, Math.min(5, Math.floor(s)));
    activeUploadStep = s;

    stepPanels.forEach((p, idx) => {
      if (!p) return;
      const show = idx + 1 <= activeUploadStep;
      setPanelVisible(p, show);
    });

    const actionGroups = [
      [stepNext1],
      [stepBack2, stepNext2],
      [stepBack3, stepNext3],
      [stepBack4, stepNext4],
      [stepBack5],
    ];
    actionGroups.forEach((group, idx) => {
      const on = idx + 1 === activeUploadStep;
      group.forEach((btn) => {
        if (!btn) return;
        btn.hidden = !on;
        btn.classList.toggle("hidden", !on);
      });
    });

    setStepActiveStyle(stepBtn1, stepDot1, s === 1);
    setStepActiveStyle(stepBtn2, stepDot2, s === 2);
    setStepActiveStyle(stepBtn3, stepDot3, s === 3);
    setStepActiveStyle(stepBtn4, stepDot4, s === 4);
    setStepActiveStyle(stepBtn5, stepDot5, s === 5);

    renderTikTokStepper();
  };

  const tryGoStep = (step) => {
    const target = Number(step) || 1;
    if (target <= unlockedUploadStep) return setUploadStep(target);
    renderTikTokStepper();
  };

  if (pendingDraft) {
    applyDraftToForm(pendingDraft);
    restoreAttrSelectionsFromDraft(pendingDraft);
    renderAttrSummary();
    renderTikTokImagePreview();
    updateBrandSelectedHint();
    pendingDraft = null;
  }

  const renderTikTokTemplateForm = () => {
    if (!templateForm) return;
    templateForm.innerHTML = "";
    showTemplateMsg("");

    const appendBrandCard = () => {
      if (!brandBlock) return false;
      brandBlock.classList.remove("hidden");
      brandBlock.classList.add("lg:col-span-2");
      templateForm.appendChild(brandBlock);
      return true;
    };
    appendBrandCard();

    const items = getTikTokTemplateItems();
    if (!items.length) {
      const emptyMsg = document.createElement("div");
      emptyMsg.className = "text-xs text-slate-400";
      emptyMsg.textContent = "模板为空或未加载。";
      templateForm.appendChild(emptyMsg);
      renderAttrSummary();
      return;
    }

    const requiredItems = items.filter((x) => x.required);
    const optionalItems = items.filter((x) => !x.required);

    const mkSection = (title, subtitle, icon, tone) => {
      const t = tone === "danger" ? "danger" : "neutral";
      const styles = t === "danger" ? "border-rose-100 bg-rose-50/60 text-rose-700" : "border-slate-100 bg-slate-50/70 text-slate-700";
      const el = document.createElement("div");
      el.className = "lg:col-span-2 mt-2";
      el.innerHTML = `
        <div class="rounded-3xl border ${styles} p-4">
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-white/70 border border-white/60 inline-flex items-center justify-center">
                <i class="fas ${escapeHtml(icon)}"></i>
              </div>
              <div>
                <div class="text-base font-black">${escapeHtml(title)}</div>
                <div class="text-xs text-slate-500 mt-0.5">${escapeHtml(subtitle || "")}</div>
              </div>
            </div>
          </div>
        </div>
      `;
      return el;
    };

    const renderChoice = (wrap, item, hooks = {}) => {
      const onSelected = hooks.onSelected;
      const onCleared = hooks.onCleared;
      const useDraft = hooks.useDraft === true;
      const draft = hooks.draft instanceof Set ? hooks.draft : null;
      const onDraftChange = hooks.onDraftChange;
      const values = Array.isArray(item.values) ? item.values : [];
      const many = values.length > 36;
      const isMulti = Boolean(item.multiple);
      const baseBtn =
        "px-3 py-2 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 text-left flex items-center justify-between gap-2 transition-colors";

      const setBtnSelected = (btn, on) => {
        btn.classList.toggle("ring-2", on);
        btn.classList.toggle("ring-accent/30", on);
        btn.classList.toggle("border-accent/40", on);
        btn.classList.toggle("bg-accent/5", on);
        btn.querySelector("i")?.classList.toggle("hidden", !on);
      };

      const getChosen = () => {
        if (useDraft && draft) return Array.from(draft);
        return getSelectedValues(item.id)
          .map((entry) => String(entry?.value ?? "").trim())
          .filter(Boolean);
      };
      const isChosen = (val) => getChosen().includes(val);

      const buildGrid = (list) => {
        const grid = document.createElement("div");
        grid.className = "grid grid-cols-2 sm:grid-cols-3 gap-2";
        for (const v of list) {
          const label = String(v?.name ?? v?.value ?? v?.id ?? "-");
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = baseBtn;
          btn.dataset.value = label;
          btn.innerHTML = `<span class="truncate">${escapeHtml(label)}</span><i class="fas fa-check text-emerald-600 hidden"></i>`;
          setBtnSelected(btn, isChosen(label));
          btn.addEventListener("click", async () => {
            if (btn.dataset.pending === "1") return;
            const val = String(btn.dataset.value ?? "").trim();
            if (!val) return;
            if (useDraft && draft) {
              const has = draft.has(val);
              if (isMulti) {
                if (has) draft.delete(val);
                else draft.add(val);
                setBtnSelected(btn, !has);
              } else {
                draft.clear();
                if (!has) draft.add(val);
                grid.querySelectorAll("button").forEach((b) =>
                  setBtnSelected(b, draft.has(String(b.dataset.value ?? "")))
                );
              }
              if (typeof onDraftChange === "function") onDraftChange(val);
              return;
            }
            if (isChosen(val)) {
              if (isMulti) {
                removeAttrSelection(item.id, val);
                setBtnSelected(btn, false);
              } else {
                clearAttrSelection(item.id);
                grid.querySelectorAll("button").forEach((b) => setBtnSelected(b, false));
              }
              if (typeof onCleared === "function") onCleared(val);
              return;
            }
            if (isMulti) {
              setAttrSelection(item.id, val, val, { multiple: true, allowLocal: true });
              setBtnSelected(btn, true);
              if (typeof onSelected === "function") onSelected(val);
              return;
            }
            setAttrSelection(item.id, val, val, { multiple: false, allowLocal: true });
            grid.querySelectorAll("button").forEach((b) => setBtnSelected(b, String(b.dataset.value) === val));
            if (typeof onSelected === "function") onSelected(val);
          });
          grid.appendChild(btn);
        }
        return grid;
      };

      if (!many) {
        wrap.appendChild(buildGrid(values.slice(0, 220)));
        return;
      }

      const tabs = document.createElement("div");
      tabs.className = "flex flex-wrap items-center gap-2";
      const tabBtn = (key, text, icon) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className =
          "px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-black text-slate-700 flex items-center gap-1.5";
        b.dataset.key = key;
        b.innerHTML = `<i class="fas ${escapeHtml(icon)} text-slate-500"></i><span>${escapeHtml(text)}</span>`;
        return b;
      };
      const btnCommon = tabBtn("common", "常用", "fa-bolt");
      const btnAll = tabBtn("all", "全部", "fa-layer-group");
      tabs.appendChild(btnCommon);
      tabs.appendChild(btnAll);

      const content = document.createElement("div");
      content.className = "mt-2 space-y-2";
      const state = { tab: "common", q: "" };
      const renderTab = () => {
        content.innerHTML = "";
        [btnCommon, btnAll].forEach((b) => {
          const on = b.dataset.key === state.tab;
          b.classList.toggle("ring-2", on);
          b.classList.toggle("ring-accent/30", on);
          b.classList.toggle("border-accent/40", on);
          b.classList.toggle("bg-accent/5", on);
        });
        if (state.tab === "all") {
          const searchWrap = document.createElement("div");
          searchWrap.className = "flex items-center gap-2";
          searchWrap.innerHTML = `
            <div class="flex-1 relative">
              <i class="fas fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[11px]"></i>
              <input class="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-white" placeholder="输入关键词筛选" />
            </div>
            <button type="button" class="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50">清空</button>
          `;
          const input = searchWrap.querySelector("input");
          const clearBtn = searchWrap.querySelector("button");
          if (input) input.value = state.q || "";
          if (input) input.addEventListener("input", () => { state.q = String(input.value ?? ""); renderTab(); });
          if (clearBtn) clearBtn.addEventListener("click", () => { state.q = ""; if (input) input.value = ""; renderTab(); });
          content.appendChild(searchWrap);

          const q = String(state.q || "").trim().toLowerCase();
          const filtered = q ? values.filter((v) => String(v?.name ?? v?.value ?? v?.id ?? "").toLowerCase().includes(q)) : values;
          content.appendChild(buildGrid(filtered.slice(0, 200)));
          const tip = document.createElement("div");
          tip.className = "text-[11px] text-slate-400";
          tip.textContent =
            filtered.length > 200 ? `匹配 ${filtered.length} 项，仅展示前 200 项；继续输入关键词缩小范围` : `匹配 ${filtered.length} 项`;
          content.appendChild(tip);
          return;
        }
        content.appendChild(buildGrid(values.slice(0, 36)));
        const tip = document.createElement("div");
        tip.className = "text-[11px] text-slate-400";
        tip.textContent = "常用：展示前 36 项；更多请切换到「全部」";
        content.appendChild(tip);
      };
      [btnCommon, btnAll].forEach((b) => b.addEventListener("click", () => { state.tab = b.dataset.key || "common"; renderTab(); }));
      wrap.appendChild(tabs);
      wrap.appendChild(content);
      renderTab();
    };

    const ensureAttrModal = (() => {
      let modal = null;
      return () => {
        if (modal) return modal;
        modal = document.getElementById("tiktok-attr-modal");
        if (modal) return modal;
        const overlay = document.createElement("div");
        overlay.id = "tiktok-attr-modal";
        overlay.className = "fixed inset-0 z-[60] hidden items-center justify-center bg-slate-900/40 px-4 py-6";
        overlay.innerHTML = `
          <div class="relative w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-3">
              <div class="min-w-0">
                <div class="text-sm font-black text-slate-900" data-attr-modal-title>属性选择</div>
                <div class="text-[11px] text-slate-400 mt-0.5" data-attr-modal-subtitle>点击一个选项完成选择</div>
              </div>
              <button type="button" data-attr-modal-close class="w-9 h-9 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200">
                <i class="fas fa-xmark"></i>
              </button>
            </div>
            <div class="p-5 max-h-[70vh] overflow-auto" data-attr-modal-body></div>
          </div>
        `;
        document.body.appendChild(overlay);
        const close = () => {
          overlay.classList.add("hidden");
          overlay.classList.remove("flex");
        };
        overlay.addEventListener("click", (e) => {
          if (e.target === overlay) close();
        });
        const closeBtn = overlay.querySelector("[data-attr-modal-close]");
        if (closeBtn) closeBtn.addEventListener("click", close);
        modal = overlay;
        return modal;
      };
    })();

    const openAttrModal = (item, hooks = {}) => {
      const modal = ensureAttrModal();
      const title = modal.querySelector("[data-attr-modal-title]");
      const subtitle = modal.querySelector("[data-attr-modal-subtitle]");
      const body = modal.querySelector("[data-attr-modal-body]");
      const isMulti = Boolean(item?.multiple);
      const hasValues = Array.isArray(item?.values) && item.values.length > 0;
      const allowCustomRaw = item?.is_customizable;
      const allowCustom =
        allowCustomRaw === true ||
        allowCustomRaw === 1 ||
        allowCustomRaw === "1" ||
        String(allowCustomRaw ?? "").toLowerCase() === "true";
      const useDraft = allowCustom && (hasValues || item?.multiple === true || item?.multiple === false);
      const draft = useDraft
        ? new Set(
            getSelectedValues(item?.id)
              .map((entry) => String(entry?.value ?? "").trim())
              .filter(Boolean)
          )
        : null;
      if (title) title.textContent = item?.name ? String(item.name) : "属性选择";
      if (subtitle) {
        subtitle.textContent = useDraft
          ? `${isMulti ? "多选" : "单选"} ? 选好后点“确认”应用`
          : "点击一个选项完成选择";
      }
      const close = () => {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
      };

      const applyDraftSelection = async () => {
        if (!draft) return true;
        const chosen = Array.from(draft)
          .map((v) => String(v ?? "").trim())
          .filter(Boolean);
        const current = getSelectedValues(item?.id)
          .map((entry) => String(entry?.value ?? "").trim())
          .filter(Boolean);
        if (!chosen.length) {
          clearAttrSelection(item?.id);
          if (typeof hooks.onCleared === "function") hooks.onCleared("");
          return true;
        }
        if (!isMulti) {
          const val = chosen[0];
          const bucket = getSelectedBucket(item?.id);
          const existing = bucket?.values?.find((x) => String(x?.value ?? "").trim() === val);
          if (existing?.goods_attr_id) {
            setAttrSelection(item?.id, val, existing.goods_attr_id, { multiple: false });
            if (typeof hooks.onSelected === "function") hooks.onSelected(val);
            return true;
          }
          setAttrSelection(item?.id, val, val, { multiple: false, allowLocal: true });
          if (typeof hooks.onSelected === "function") hooks.onSelected(val);
          return true;
        }
        for (const val of current) {
          if (!chosen.includes(val)) removeAttrSelection(item?.id, val);
        }
        for (const val of chosen) {
          if (!current.includes(val)) setAttrSelection(item?.id, val, val, { multiple: true, allowLocal: true });
        }
        if (typeof hooks.onSelected === "function") hooks.onSelected(chosen[0] || "");
        return true;
      };

      if (body) {
        const renderModalBody = () => {
          body.innerHTML = "";
          const wrap = document.createElement("div");
          const modalHasValues = Array.isArray(item?.values) && item.values.length > 0;
          const needsInput = !modalHasValues || allowCustom;
          let leftInfo = null;

          const updateLeftInfo = () => {
            if (!leftInfo || !draft) return;
            if (!isMulti) {
              leftInfo.textContent = draft.size ? "已选择 1 项" : "未选择";
              return;
            }
            leftInfo.textContent = `已选 ${draft.size} 项`;
          };

          if (modalHasValues) {
            renderChoice(wrap, item, {
              useDraft,
              draft,
              onDraftChange: () => {
                updateLeftInfo();
              },
              onSelected: (val) => {
                if (typeof hooks.onSelected === "function") hooks.onSelected(val);
                if (!isMulti) close();
              },
              onCleared: (val) => {
                if (typeof hooks.onCleared === "function") hooks.onCleared(val);
              },
            });
          }
          if (needsInput) {
            const inputWrap = document.createElement("div");
            inputWrap.className = "mt-3 space-y-2";
            inputWrap.innerHTML = `
              <div class="text-xs text-slate-500">自定义属性值</div>
              <div class="flex items-center gap-2">
                <input type="text" class="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs" placeholder="请输入属性值" />
                <button type="button" class="px-3 py-2 rounded-xl bg-accent text-white text-xs font-semibold hover:bg-accent/90">添加</button>
              </div>
            `;
            const inputEl = inputWrap.querySelector("input");
            const addBtn = inputWrap.querySelector("button");
            const doAdd = () => {
              const val = String(inputEl?.value ?? "").trim();
              if (!val) return;
              if (!Array.isArray(item.values)) item.values = [];
              const exists = item.values.some((v) => String(v?.name ?? v?.value ?? v?.id ?? "").trim() === val);
              if (!exists) item.values.push({ name: val, value: val, id: val });
              if (inputEl) inputEl.value = "";
              renderModalBody();
            };
            if (addBtn) addBtn.addEventListener("click", doAdd);
            if (inputEl) {
              inputEl.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  doAdd();
                }
              });
            }
            wrap.appendChild(inputWrap);
          }

          if (useDraft) {
            const footer = document.createElement("div");
            footer.className = "mt-4 flex items-center justify-between gap-2";

            leftInfo = document.createElement("div");
            leftInfo.className = "text-[11px] text-slate-400 min-w-0 truncate";

            const actions = document.createElement("div");
            actions.className = "flex items-center gap-2";

            const clearBtn = document.createElement("button");
            clearBtn.type = "button";
            clearBtn.className =
              "px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50";
            clearBtn.textContent = "清空";

            const cancelBtn = document.createElement("button");
            cancelBtn.type = "button";
            cancelBtn.className =
              "px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50";
            cancelBtn.textContent = "取消";

            const confirmBtn = document.createElement("button");
            confirmBtn.type = "button";
            confirmBtn.className = "px-3 py-2 rounded-xl bg-accent text-white text-xs font-semibold hover:bg-accent/90";
            confirmBtn.textContent = "确认";

            actions.appendChild(clearBtn);
            actions.appendChild(cancelBtn);
            actions.appendChild(confirmBtn);
            footer.appendChild(leftInfo);
            footer.appendChild(actions);
            wrap.appendChild(footer);

            updateLeftInfo();

            clearBtn.addEventListener("click", () => {
              draft.clear();
              renderModalBody();
            });
            cancelBtn.addEventListener("click", close);
            confirmBtn.addEventListener("click", async () => {
              if (confirmBtn.dataset.pending === "1") return;
              confirmBtn.dataset.pending = "1";
              const original = confirmBtn.innerHTML;
              confirmBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-1"></i>处理中';
              try {
                const ok = await applyDraftSelection();
                if (ok) close();
              } finally {
                confirmBtn.dataset.pending = "0";
                confirmBtn.innerHTML = original;
              }
            });
          }

          body.appendChild(wrap);
        };
        renderModalBody();
      }
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    };

    const renderItem = (item) => {
      const card = document.createElement("div");
      const isReq = Boolean(item.required);
      const baseReq = "relative overflow-hidden rounded-3xl border-2 border-accent/20 bg-accent/5 p-5 pl-6 hover:border-accent/30 transition-colors";
      const baseOpt = "relative overflow-hidden rounded-3xl border-2 border-slate-100 bg-white p-5 pl-6 hover:border-accent/30 transition-colors";
      const valuesCount = Array.isArray(item.values) ? item.values.length : 0;
      const hasValues = valuesCount > 0;
      const infoText = hasValues ? `候选 ${valuesCount} 个属性值` : "文书填写";
      const typeLabel = hasValues ? (item.multiple ? "多选属性" : "单选属性") : "文本";
      const requiredChip = isReq
        ? '<span class="text-[10px] text-rose-700 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full font-black">必填</span>'
        : "";
      const typeChip = `<span class="text-[10px] text-sky-800 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full font-black border">${typeLabel}</span>`;
      card.className = `${isReq ? baseReq : baseOpt} cursor-pointer`;
      card.innerHTML = `
        <button type="button" data-item-toggle="1" class="w-full text-left">
          <div class="absolute left-2 top-4 bottom-4 w-1 rounded-full ${isReq ? "bg-rose-500" : "bg-slate-400/70"}"></div>
          <div class="pl-2 space-y-2">
            <div class="flex items-start gap-2 text-base font-black text-slate-900">
              <i class="fas fa-list-check text-slate-600 mt-0.5"></i>
              <span class="break-words whitespace-normal">${escapeHtml(item.name)}</span>
            </div>
            <div class="text-[11px] text-slate-400 flex items-center gap-2">
              <i class="fas fa-circle-info"></i>
              <span>${escapeHtml(infoText)}</span>
            </div>
            <div data-chips="1" class="flex flex-wrap gap-1.5 justify-end">
              ${requiredChip}
              ${typeChip}
            </div>
            <div data-result="1" class="mt-2 flex flex-wrap gap-1.5"></div>
          </div>
        </button>
      `;

      const selectedValues = () =>
        getSelectedValues(item.id)
          .map((entry) => String(entry?.value ?? "").trim())
          .filter(Boolean);

      const applyCardStatus = () => {
        const chips = card.querySelector('[data-chips="1"]');
        const resultEl = card.querySelector('[data-result="1"]');
        if (!chips || !resultEl) return;

        let statusEl = chips.querySelector('[data-status="1"]');
        if (!statusEl) {
          statusEl = document.createElement("span");
          statusEl.dataset.status = "1";
          chips.prepend(statusEl);
        }

        const vals = selectedValues();
        const pillBase = "px-2 py-0.5 rounded-full border text-[11px] font-semibold";
        const pillMain = `${pillBase} bg-accent/5 border-accent/20 text-slate-800`;
        const emptyText = '<span class="text-[11px] text-slate-400">未填写</span>';
        const baseStatusCls = "inline-flex items-center gap-1 text-[11px] px-3 py-1 rounded-full font-black border shadow-sm";

        if (vals.length) {
          statusEl.className = `${baseStatusCls} attr-status-done`;
          statusEl.innerHTML = '<i class="fas fa-circle-check text-white"></i><span>已完成</span>';
          card.classList.add("attr-card-done");
          card.classList.remove("attr-card-attention");
          resultEl.innerHTML = vals.map((val) => `<span class="${pillMain}">${escapeHtml(val)}</span>`).join("");
          return;
        }

        const pendingCls = isReq
          ? `${baseStatusCls} text-rose-700 bg-rose-50 border-rose-100`
          : `${baseStatusCls} text-slate-700 bg-slate-100 border-slate-200`;
        statusEl.className = pendingCls;
        statusEl.innerHTML = `<i class="fas ${isReq ? "fa-asterisk" : "fa-dot-circle"}"></i><span>${isReq ? "必填未填" : "选填未填"}</span>`;
        card.classList.remove("attr-card-done");
        resultEl.innerHTML = emptyText;
      };

      applyCardStatus();

      const toggle = card.querySelector("[data-item-toggle='1']") || card.querySelector('[data-item-toggle="1"]');
      if (toggle) {
        toggle.addEventListener("click", () => {
        openAttrModal(item, {
          onSelected: () => {
            applyCardStatus();
          },
          onCleared: () => {
            applyCardStatus();
          },
        });
        });
      }

      return card;
    };

    if (requiredItems.length) templateForm.appendChild(mkSection("必填项", "优先填写，避免提交失败", "fa-circle-exclamation", "danger"));
    for (const item of requiredItems) templateForm.appendChild(renderItem(item));
    if (optionalItems.length) templateForm.appendChild(mkSection("选填项", "按需选择", "fa-sparkles", "neutral"));
    for (const item of optionalItems) templateForm.appendChild(renderItem(item));
    renderAttrSummary();
    renderTikTokStepper({ autoAdvance: true });
  };

  if (templateClearBtn) {
    templateClearBtn.addEventListener("click", () => {
      selectedAttrs.clear();
      writeTikTokAttrsJson([]);
      renderAttrSummary();
      renderTikTokTemplateForm();
      clearSalesAttrSelections();
      showTemplateMsg("");
      renderTikTokStepper();
      queueDraftSave();
    });
  }

  const fetchTikTokTemplate = async (catId) => {
    const cid = String(catId ?? "").trim();
    if (!cid || cid === "-") return null;
    if (templateBtn) {
      templateBtn.disabled = true;
      templateBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-1"></i>加载中...';
    }
    try {
      const res = await postAuthedJson("/api/tiktok/getAttributeTemplate", { goods_id: 0, cat_id: cid });
      lastTemplateRes = res;
      setPre(templatePre, res);
      if (canRestoreDraftAttrs(cid)) {
        restoreAttrSelectionsFromDraft(draftState);
        draftApplied = true;
      }
      renderTikTokTemplateForm();
      syncCertificationsFromTemplate(res);
      renderTikTokSalesAttrs();
      renderTikTokSalesAttrValues();
      renderTikTokSkuGrid();
      return res;
    } catch {
      lastTemplateRes = { code: "1", msg: "网络异常，请稍后重试。", data: {} };
      setPre(templatePre, lastTemplateRes);
      renderTikTokTemplateForm();
      renderTikTokSalesAttrs();
      renderTikTokSalesAttrValues();
      renderTikTokSkuGrid();
      return lastTemplateRes;
    } finally {
      if (templateBtn) {
        templateBtn.disabled = false;
        templateBtn.innerHTML = '<i class="fas fa-wand-magic-sparkles mr-1"></i>重新获取模板';
      }
    }
  };

  if (templateBtn) {
    templateBtn.addEventListener("click", async () => {
      if (!isCatSelected()) {
        showTemplateMsg("请先选择末级类目。");
        return;
      }
      const catId = catOut.textContent.trim();
      if (!catId || catId === "-") {
        setPre(templatePre, { code: "1", msg: "请选择末级类目(cat_id)" });
        return;
      }
      resetTemplateState({ keepAttrs: canRestoreDraftAttrs(catId) });
      const res = await fetchTikTokTemplate(catId);

      const buildIndex = () => {
        lastAttrIndex = new Map();
        const res = lastTemplateRes;
        const data = res?.data || {};
        const attrs = Array.isArray(data?.product_attr_arr) ? data.product_attr_arr : [];
        const sales = Array.isArray(data?.pro_main_arr) ? data.pro_main_arr : [];

        for (const a of attrs) {
          const id = a?.id;
          const name = a?.name;
          if (id == null || name == null) continue;
          lastAttrIndex.set(String(id), { kind: "product", raw: a });
        }
        for (const s of sales) {
          const id = s?.attribute_id ?? s?.attr_id;
          const name = s?.attribute_name ?? s?.attribute_name_en;
          if (id == null || name == null) continue;
          if (!lastAttrIndex.has(String(id))) lastAttrIndex.set(String(id), { kind: "sales", raw: s });
        }

        if (tplAttrSel) {
          tplAttrSel.innerHTML = '<option value="">从模板选择属性(可选)</option>';
          const options = [];
          for (const [id, item] of lastAttrIndex.entries()) {
            const raw = item.raw || {};
            const name = raw.name ?? raw.attribute_name ?? raw.attribute_name_en ?? id;
            const req = raw.is_requried === true ? " *" : "";
            const type = raw.type ? ` (${raw.type})` : "";
            options.push({ id, label: `${name}${type}${req} [${id}]` });
          }
          options.sort((a, b) => a.label.localeCompare(b.label, "zh-CN"));
          for (const o of options) {
            const opt = document.createElement("option");
            opt.value = o.id;
            opt.textContent = o.label;
            tplAttrSel.appendChild(opt);
          }
        }

        if (tplValueSel) {
          tplValueSel.innerHTML = '<option value="">从模板选择属性值(可选)</option>';
        }
      };

      buildIndex();

      if (brandResults) {
        const brands = res?.data?.brands ?? lastTemplateRes?.data?.brands;
        const list = normalizeBrandList({ data: { brands } });
        lastBrandList = list;
        setDefaultBrandListIfEmpty(list);
        brandResults.innerHTML = '<option value="">选择品牌(模板返回)</option>';
        for (const b of list) {
          const opt = document.createElement("option");
          opt.value = String(b.id ?? "");
          const label = `${b.name ?? b.id ?? "-"}`;
          opt.textContent = label;
          brandResults.appendChild(opt);
        }
        updateBrandListView(brandSearchName?.value || "");
        if (list.length) showBrandSummary(`模板返回 ${list.length} 个品牌`);
      }
      renderTikTokStepper({ autoAdvance: true });
    });
  }

  const maybeAutoFetchTemplate = async () => {
    const cid = getCatId();
    if (!cid || cid === "-") {
      if (lastTemplateRes) resetTemplateState();
      lastTemplateCatId = "";
      renderTikTokStepper();
      return;
    }
    if (cid === lastTemplateCatId) {
      renderTikTokStepper();
      return;
    }
    resetTemplateState({ keepAttrs: canRestoreDraftAttrs(cid) });
    const res = await fetchTikTokTemplate(cid);
    syncTemplateDependencies(res);
    renderTikTokStepper({ autoAdvance: true });
  };

  const ensureTemplateReady = async () => {
    if (!isCatSelected()) {
      showTemplateMsg("请先选择末级类目。");
      return false;
    }
    const catId = getCatId();
    if (!catId || catId === "-") {
      showTemplateMsg("请选择末级类目(cat_id)");
      return false;
    }
    if (!lastTemplateRes || lastTemplateCatId !== catId) {
      resetTemplateState({ keepAttrs: canRestoreDraftAttrs(catId) });
      const res = await fetchTikTokTemplate(catId);
      syncTemplateDependencies(res);
    }
    return true;
  };

  // Auto fetch template if category already selected (e.g. restored from cache).
  maybeAutoFetchTemplate();
  renderTikTokSalesAttrs();
  renderTikTokSalesAttrValues();
  renderTikTokSkuGrid();

  if (salesAttrNamesEl) {
    salesAttrNamesEl.addEventListener("click", (e) => {
      const btn = e.target?.closest?.("[data-sales-spec-id]");
      if (!btn) return;
      const id = String(btn.dataset.salesSpecId ?? "").trim();
      if (!id) return;
      const items = getTikTokSalesItems();
      const hit = items.find((it) => String(it.id) === id);
      if (hit) {
        toggleSalesAttrSelection(id, { ...hit, custom: false, values: salesAttrSelections.get(id)?.values || [] });
      } else if (salesAttrSelections.has(id)) {
        toggleSalesAttrSelection(id);
      } else {
        const label = id.replace(/^custom:/, "");
        toggleSalesAttrSelection(id, { id, name: label || id, custom: true, values: [] });
      }
    });
  }

  if (salesAttrCustomAdd) {
    salesAttrCustomAdd.addEventListener("click", () => {
      addCustomSalesAttrName();
    });
  }

  if (salesAttrCustomInput) {
    salesAttrCustomInput.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      addCustomSalesAttrName();
    });
  }

  if (salesAttrValuesEl) {
    salesAttrValuesEl.addEventListener("click", async (e) => {
      const addBtn = e.target?.closest?.("[data-sales-value-add]");
      if (addBtn) {
        const specId = String(addBtn.dataset.salesValueAdd ?? "").trim();
        const sel = salesAttrSelections.get(specId);
        if (!sel) return;
        const input = salesAttrValuesEl.querySelector(`[data-sales-value-input="${CSS.escape(specId)}"]`);
        const val = String(input?.value ?? "").trim();
        if (!val) {
          setSalesAttrNameMsg("请填写属性值。", "error");
          return;
        }
        if (sel.values?.some((v) => String(v.value ?? "") === val)) {
          setSalesAttrNameMsg("该属性值已存在。", "error");
          return;
        }
        addBtn.disabled = true;
        addBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-1"></i>记录中';
        try {
          const goodsId = attrGoodsId?.value?.trim() || "0";
          const res = await postAuthedJson("/api/tiktok/insert_attr_input", {
            goods_id: goodsId,
            attr_value: val,
            type_name: sel.name,
            type_id: sel.id,
          });
          if (String(res?.code) === "2") {
            clearAuth();
            window.location.href = "/login.html";
            return;
          }
          if (String(res?.code) !== "0" || !res?.data?.goods_attr_id) {
            setSalesAttrNameMsg(res?.msg || "属性值记录失败。", "error");
            return;
          }
          const goodsAttrId = String(res.data.goods_attr_id ?? "").trim();
          sel.values = Array.isArray(sel.values) ? sel.values : [];
          sel.values.push({ value: val, goods_attr_id: goodsAttrId });
          if (input) input.value = "";
          setSalesAttrNameMsg("属性值已记录。", "ok");
          renderTikTokSalesAttrValues();
          renderTikTokSkuGrid();
        } catch {
          setSalesAttrNameMsg("网络异常，请稍后重试。", "error");
        } finally {
          addBtn.disabled = false;
          addBtn.innerHTML = "添加";
        }
        return;
      }

      const removeBtn = e.target?.closest?.("[data-sales-value-remove]");
      if (removeBtn) {
        const specId = String(removeBtn.dataset.salesValueRemove ?? "").trim();
        const valId = String(removeBtn.dataset.salesValueId ?? "").trim();
        const sel = salesAttrSelections.get(specId);
        if (!sel) return;
        sel.values = (Array.isArray(sel.values) ? sel.values : []).filter(
          (v) => String(v.goods_attr_id ?? "") !== valId
        );
        renderTikTokSalesAttrValues();
        renderTikTokSkuGrid();
      }
    });
  }

  if (skuGridEl) {
    skuGridEl.addEventListener("click", (e) => {
      const editBtn = e.target?.closest?.("[data-sku-edit]");
      if (!editBtn) return;
      const key = String(editBtn.dataset.skuEdit ?? "").trim();
      const label = String(editBtn.dataset.skuLabel ?? "").trim();
      openSkuModal(key, label);
    });
  }

  if (skuModal) {
    skuModal.querySelectorAll("[data-sku-modal-field]").forEach((input) => {
      const updateSku = () => {
        if (!activeSkuKey) return;
        if (!skuDraft.has(activeSkuKey)) skuDraft.set(activeSkuKey, { attr_img_list: [] });
        const row = skuDraft.get(activeSkuKey);
        const field = input.getAttribute("data-sku-modal-field");
        row[field] = String(input.value ?? "").trim();
        renderSkuModalStatus();
        renderTikTokSkuGrid();
      };
      input.addEventListener("input", updateSku);
      input.addEventListener("change", updateSku);
    });
  }

  if (skuModalUpload) {
    skuModalUpload.addEventListener("click", () => {
      if (skuModalFile) skuModalFile.click();
    });
  }

  if (skuModalFile) {
    skuModalFile.addEventListener("change", async () => {
      if (!activeSkuKey) return;
      const row = skuDraft.get(activeSkuKey);
      if (!row) return;
      const files = Array.from(skuModalFile.files || []);
      if (!files.length) return;
      row.attr_img_list = Array.isArray(row.attr_img_list) ? row.attr_img_list : [];
      const remaining = Math.max(0, 10 - row.attr_img_list.length);
      const queue = files.slice(0, remaining);
      if (queue.length < files.length) setSalesAttrNameMsg("每个组合最多上传 10 张图片。", "error");

      const pending = queue.map((file) => {
        const localId = `sku-local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
        let tempUrl = "";
        try {
          tempUrl = URL.createObjectURL(file);
        } catch {
          tempUrl = "";
        }
        row.attr_img_list.push({
          img_id: "0",
          img_url: tempUrl,
          name: file.name || "",
          localId,
          uploading: true,
          uploadedOk: false,
          uploadError: "",
        });
        return { file, localId, tempUrl };
      });

      renderSkuModalImages();
      renderSkuModalStatus();

      const updateSkuImg = (localId, patch) => {
        const img = row.attr_img_list.find((x) => x?.localId === localId);
        if (!img) return;
        Object.assign(img, patch);
      };

      for (const { file, localId, tempUrl } of pending) {
        const res = await uploadTikTokSkuAttrImage(file);
        if (!res.ok || !res.url) {
          updateSkuImg(localId, { uploading: false, uploadError: res.msg || res?.res?.msg || "上传失败" });
        } else {
          updateSkuImg(localId, { img_url: res.url, uploading: false, uploadedOk: true, uploadError: "" });
        }
        if (tempUrl) {
          try {
            URL.revokeObjectURL(tempUrl);
          } catch {
            // ignore
          }
        }
      }

      skuModalFile.value = "";
      renderSkuModalImages();
      renderSkuModalStatus();
      renderTikTokSkuGrid();
    });
  }

  if (skuModalImages) {
    skuModalImages.addEventListener("click", (e) => {
      const removeBtn = e.target?.closest?.("[data-sku-modal-img-remove]");
      if (!removeBtn) return;
      const idx = Number(removeBtn.dataset.skuModalImgIdx ?? "-1");
      const row = skuDraft.get(activeSkuKey);
      if (!row || !Array.isArray(row.attr_img_list)) return;
      if (!Number.isFinite(idx) || idx < 0) return;
      row.attr_img_list.splice(idx, 1);
      renderSkuModalImages();
      renderSkuModalStatus();
      renderTikTokSkuGrid();
    });
  }

  if (skuModalClose) skuModalClose.addEventListener("click", closeSkuModal);
  if (skuModalOverlay) skuModalOverlay.addEventListener("click", closeSkuModal);
  if (skuModal) {
    const handleSkuEsc = (e) => {
      if (e.key !== "Escape") return;
      if (e.defaultPrevented) return;
      if (skuModal.classList.contains("hidden")) return;
      const viewer = document.getElementById("image-viewer");
      if (viewer && !viewer.classList.contains("hidden")) return;
      closeSkuModal();
    };
    document.addEventListener("keydown", handleSkuEsc);
  }

  try {
    const obs = new MutationObserver(() => {
      refreshTemplateEnabled();
      maybeAutoFetchTemplate();
      renderTikTokStepper();
      queueDraftSave();
    });
    obs.observe(catOut, { childList: true, characterData: true, subtree: true });
  } catch {
    // ignore
  }

  if (tplAttrSel) {
    tplAttrSel.addEventListener("change", () => {
      const id = tplAttrSel.value;
      const item = lastAttrIndex.get(String(id));
      if (!item) return;
      const raw = item.raw || {};
      const name = raw.name ?? raw.attribute_name ?? raw.attribute_name_en ?? "";

      if (attrAttrId) attrAttrId.value = String(id);
      if (attrTypeId) attrTypeId.value = String(id);
      if (attrTypeName) attrTypeName.value = String(name);

      if (tplValueSel) {
        tplValueSel.innerHTML = '<option value="">从模板选择属性值(可选)</option>';
        const values = normalizeTikTokValues(raw);
        for (const v of values) {
          const vid = v?.id ?? v?.vid ?? v?.value_id ?? v?.valueId ?? v?.valueID;
          const opt = document.createElement("option");
          opt.value = String(v?.name ?? "");
          opt.textContent = `${v?.name ?? "-"}${vid != null ? ` [${vid}]` : ""}`;
          tplValueSel.appendChild(opt);
        }
      }
    });
  }

  if (tplValueSel) {
    tplValueSel.addEventListener("change", () => {
      if (attrValue && tplValueSel.value) attrValue.value = tplValueSel.value;
    });
  }

  const updateFileAccept = () => {
    if (!fileInput) return;
    fileInput.accept = "image/*";
    fileInput.multiple = true;
  };
  updateFileAccept();

  const updateUploadButtonState = () => {
    const pending = uploadPendingCount;
    const busy = pending > 0 || uploadInFlight;
    if (uploadGoodsBtn) {
      uploadGoodsBtn.disabled = busy;
      uploadGoodsBtn.innerHTML = busy
        ? `<i class="fas fa-circle-notch fa-spin mr-1"></i>上传中${pending > 0 ? ` (${pending})` : ""}`
        : uploadGoodsBtnDefaultHtml || uploadGoodsBtn.innerHTML;
    }
    if (uploadAttrsBtn) {
      uploadAttrsBtn.disabled = busy;
      uploadAttrsBtn.innerHTML = busy
        ? `<i class="fas fa-circle-notch fa-spin mr-1"></i>上传中${pending > 0 ? ` (${pending})` : ""}`
        : uploadAttrsBtnDefaultHtml || uploadAttrsBtn.innerHTML;
    }
  };

  const doUploadTikTokFile = async (kind, file) => {
    const uploadKind = String(kind || "upload_goods_img");
    if (!file) return;
    if (!isImageFile(file)) {
      setPre(uploadPre, { code: "1", msg: "请上传图片文件（jpg/png/webp/gif 等）", data: {} });
      return;
    }

    try {
      const form = new FormData();
      form.append("file", file);
      const autoUseCase = uploadKind === "upload_attrs_img" ? "ATTRIBUTE_IMAGE" : "MAIN_IMAGE";
      if (autoUseCase) form.append("use_case", autoUseCase);
      const res = await postAuthedFormData(`/api/tiktok/${uploadKind}`, form);
      setPre(uploadPre, res);

      if (String(res?.code) === "2") {
        clearAuth();
        window.location.href = "/login.html";
        return;
      }

      // only goods images are used by insert payload (goods_img_json)
      if (String(res?.code) === "0" && uploadKind === "upload_goods_img" && res?.data) {
        const list = parseTikTokImgJson();
        list.push(res.data);
        writeTikTokImgJson(list);
        renderTikTokImagePreview();
      }
    } catch {
      setPre(uploadPre, { code: "1", msg: "网络异常，请稍后重试。", data: {} });
    }
  };

  const processUploadQueue = async () => {
    if (uploadInFlight) return;
    uploadInFlight = true;
    updateUploadButtonState();
    while (uploadQueue.length) {
      const task = uploadQueue.shift();
      if (!task) continue;
      await doUploadTikTokFile(task.kind, task.file);
      uploadPendingCount = Math.max(0, uploadPendingCount - 1);
      updateUploadButtonState();
      renderTikTokImagePreview();
    }
    uploadInFlight = false;
    updateUploadButtonState();
  };

  const enqueueTikTokUploads = (files, kind) => {
    const list = Array.from(files || []).filter(Boolean);
    if (!list.length) return;
    const k = String(kind || "upload_goods_img");
    let nextList = list;
    if (k === "upload_goods_img") {
      const current = parseTikTokImgJson().length;
      const remaining = Math.max(0, MAX_TIKTOK_IMAGES - current - uploadPendingCount);
      if (remaining <= 0) {
        showUploadMsg(`最多可传${MAX_TIKTOK_IMAGES}张，首张默认主图`);
        return;
      }
      if (list.length > remaining) {
        showUploadMsg(`最多可传${MAX_TIKTOK_IMAGES}张，已自动截取前 ${remaining} 张。`);
        nextList = list.slice(0, remaining);
      } else {
        showUploadMsg("");
      }
    }
    uploadQueue.push(...nextList.map((file) => ({ file, kind: k })));
    uploadPendingCount += nextList.length;
    updateUploadButtonState();
    renderTikTokImagePreview();
    processUploadQueue();
  };

  updateUploadButtonState();

  if (fileInput) {
    fileInput.addEventListener("change", () => {
      const files = Array.from(fileInput.files || []);
      if (!files.length) return;
      const kind = String(fileInput.dataset.kind || "upload_goods_img");
      enqueueTikTokUploads(files, kind);
      fileInput.value = "";
    });
  }
  if (uploadGoodsBtn) {
    uploadGoodsBtn.addEventListener("click", () => {
      if (fileInput) fileInput.dataset.kind = "upload_goods_img";
      updateFileAccept();
      fileInput?.click?.();
    });
  }
  if (uploadAttrsBtn) {
    uploadAttrsBtn.addEventListener("click", () => {
      if (fileInput) fileInput.dataset.kind = "upload_attrs_img";
      updateFileAccept();
      fileInput?.click?.();
    });
  }

  if (certFileInput) {
    certFileInput.addEventListener("change", () => {
      const certId = String(certFileInput.dataset.certId ?? "").trim();
      const files = Array.from(certFileInput.files || []);
      certFileInput.value = "";
      if (!certId || !files.length) return;
      uploadCertFiles(certId, files);
    });
  }

  if (certificationsBlock) {
    certificationsBlock.addEventListener("click", (e) => {
      const uploadBtn = e.target?.closest?.("[data-cert-upload]");
      if (uploadBtn && certFileInput) {
        const certId = uploadBtn.getAttribute("data-cert-upload") || "";
        certFileInput.dataset.certId = certId;
        certFileInput.click();
        return;
      }
      const removeBtn = e.target?.closest?.("[data-cert-remove]");
      if (removeBtn) {
        const certId = removeBtn.getAttribute("data-cert-remove") || "";
        const idx = Number(removeBtn.getAttribute("data-cert-idx") || -1);
        if (certId && Number.isFinite(idx) && idx >= 0) {
          const list = getCertUploads(certId);
          list.splice(idx, 1);
          certificationUploads.set(String(certId), list);
          syncExtraWithCerts();
          renderCertifications();
          setCertMsg(certId, "已移除", "info");
        }
        return;
      }
      const sampleBtn = e.target?.closest?.("[data-cert-sample]");
      if (sampleBtn) {
        const url = sampleBtn.getAttribute("data-cert-sample") || "";
        imageViewer.open(url);
      }
    });
  }

  if (attrSubmit && attrPre) {
    attrSubmit.addEventListener("click", async () => {
      const goodsId = attrGoodsId?.value?.trim() || "0";
      const typeId = attrTypeId?.value?.trim() || "";
      const typeName = attrTypeName?.value?.trim() || "";
      const value = attrValue?.value?.trim() || "";
      const attrId = attrAttrId?.value?.trim() || "";

      if (!attrId || !typeId || !typeName || !value) {
        setPre(attrPre, { code: "1", msg: "请填写 attrId/type_id/type_name/attr_value" });
        return;
      }

      const res = await postAuthedJson("/api/tiktok/insert_attr_input", {
        goods_id: goodsId,
        attr_value: value,
        type_name: typeName,
        type_id: typeId,
      });
      setPre(attrPre, res);

      if (String(res?.code) !== "0" || !res?.data?.goods_attr_id) return;

      const textarea = document.getElementById("tiktok-attrs-json");
      if (!textarea) return;

      let current = [];
      try {
        const parsed = textarea.value?.trim() ? JSON.parse(textarea.value) : [];
        if (Array.isArray(parsed)) current = parsed;
      } catch {
        current = [];
      }

      current.push({
        attrId: Number.isFinite(Number(attrId)) ? Number(attrId) : attrId,
        attr_value_id: String(res.data.goods_attr_id),
        attr_value_name: value,
      });
      textarea.value = JSON.stringify(current);
    });
  }

  if (brandSearchBtn && brandResults) {
    brandSearchBtn.addEventListener("click", async () => {
      if (brandSearchBtn.dataset.pending === "1") return;
      const catId = catOut.textContent.trim();
      const name = brandSearchName?.value?.trim() || "";
      if (!catId || catId === "-") {
        showBrandSummary("请先选择末级类目(cat_id)再搜索品牌", "error");
        return;
      }
      if (!name) {
        showBrandSummary("请输入品牌名", "error");
        return;
      }

      brandSearchBtn.dataset.pending = "1";
      const original = brandSearchBtn.innerHTML;
      brandSearchBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-1"></i>搜索中';
      brandSearchBtn.disabled = true;
      try {
        const res = await postAuthedJson("/api/tiktok/searchBrand", { name, cat_id: Number(catId) });
        if (String(res?.code) === "2") {
          clearAuth();
          window.location.href = "/login.html";
          return;
        }
        if (String(res?.code) !== "0") {
          showBrandSummary(res?.msg || "品牌搜索失败", "error");
          return;
        }
        const list = normalizeBrandList(res);
        lastBrandList = list;
        brandResults.innerHTML = '<option value="">选择品牌(可选)</option>';
        for (const b of list) {
          const opt = document.createElement("option");
          opt.value = String(b.id ?? "");
          const label = `${b.name ?? b.id ?? "-"}`;
          opt.textContent = label;
          brandResults.appendChild(opt);
        }
        updateBrandListView(brandSearchName?.value || "");
        showBrandSummary(list.length ? `找到 ${list.length} 个品牌` : "未找到品牌", list.length ? "info" : "error");
        updateBrandSelectedHint();
      } finally {
        brandSearchBtn.dataset.pending = "0";
        brandSearchBtn.disabled = false;
        brandSearchBtn.innerHTML = brandSearchBtnDefaultHtml || original;
      }
    });

    brandResults.addEventListener("change", () => {
      const brandId = brandResults.value;
      if (brandId) applyBrandSelection(brandId);
    });
  }

  if (brandTrigger) {
    brandTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      setBrandDropdown(!brandDropdownOpen);
    });
  }

  if (brandCloseBtn) {
    brandCloseBtn.addEventListener("click", () => setBrandDropdown(false));
  }

  if (brandSearchName) {
    brandSearchName.addEventListener("input", () => {
      updateBrandListView(brandSearchName.value);
      showBrandSummary("");
    });
  }

  if (brandList) {
    brandList.addEventListener("click", (e) => {
      const btn = e.target?.closest?.("[data-brand-id]");
      if (!btn) return;
      const brandId = btn.dataset.brandId;
      if (brandId) applyBrandSelection(brandId);
    });
  }

  if (brandClearBtn) {
    brandClearBtn.addEventListener("click", () => {
      const brandInput = document.getElementById("tiktok-brand-id");
      if (brandInput) brandInput.value = "";
      if (brandResults) brandResults.value = "";
      updateBrandListView(brandSearchName?.value || "");
      showBrandSummary("已清空品牌选择");
    });
  }

  if (brandResetBtn) {
    brandResetBtn.addEventListener("click", () => {
      if (!brandDefaultList.length) {
        showBrandSummary("暂无可重置的品牌数据", "error");
        return;
      }
      lastBrandList = brandDefaultList.slice();
      updateBrandListView(brandSearchName?.value || "");
      showBrandSummary("已重置到初始品牌列表");
    });
  }

  const setCreatePanelOpen = (open) => {
    if (!brandCreatePanel) return;
    const show = Boolean(open);
    brandCreatePanel.classList.toggle("hidden", !show);
    if (show && brandCreateName) {
      brandCreateName.focus();
    }
    if (!show && brandCreateName) {
      brandCreateName.value = "";
    }
  };

  if (brandCreateToggle) {
    brandCreateToggle.addEventListener("click", () => {
      const open = brandCreatePanel?.classList.contains("hidden");
      setCreatePanelOpen(open);
    });
  }
  if (brandCreateCancel) {
    brandCreateCancel.addEventListener("click", () => setCreatePanelOpen(false));
  }

  document.addEventListener("click", (e) => {
    if (!brandDropdownOpen) return;
    if (brandBlock && e.target instanceof Node && !brandBlock.contains(e.target)) {
      setBrandDropdown(false);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && brandDropdownOpen) setBrandDropdown(false);
  });

  if (brandCreateBtn) {
    brandCreateBtn.addEventListener("click", async () => {
      if (brandCreateBtn.dataset.pending === "1") return;
      const catId = catOut.textContent.trim();
      const name = brandCreateName?.value?.trim() || "";
      if (!catId || catId === "-") {
        showBrandSummary("请先选择末级类目(cat_id)", "error");
        return;
      }
      if (!name) {
        showBrandSummary("请输入新品牌名称", "error");
        return;
      }
      brandCreateBtn.dataset.pending = "1";
      const original = brandCreateBtn.innerHTML;
      brandCreateBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-1"></i>创建中';
      brandCreateBtn.disabled = true;
      try {
        const res = await postAuthedJson("/api/tiktok/createBrand", { name, cat_id: Number(catId) });
        if (String(res?.code) === "2") {
          clearAuth();
          window.location.href = "/login.html";
          return;
        }
        if (String(res?.code) !== "0") {
          showBrandSummary(res?.msg || "创建品牌失败", "error");
          return;
        }
        showBrandSummary(res?.msg || "品牌创建成功", "success");
        if (String(res?.code) === "0" && res?.data?.brand_id) {
          const newId = String(res.data.brand_id);
          applyBrandSelection(newId);
          if (brandResults && !Array.from(brandResults.options).some((opt) => opt.value === newId)) {
            const opt = document.createElement("option");
            opt.value = newId;
            opt.textContent = `${name}`;
            brandResults.appendChild(opt);
          }
          if (name) {
            lastBrandList = [{ id: newId, name }, ...lastBrandList.filter((b) => String(b?.id ?? "") !== newId)];
            updateBrandListView(brandSearchName?.value || "");
          }
        }
        updateBrandSelectedHint();
        setCreatePanelOpen(false);
      } finally {
        brandCreateBtn.dataset.pending = "0";
        brandCreateBtn.disabled = false;
        brandCreateBtn.innerHTML = brandCreateBtnDefaultHtml || original;
      }
    });
  }

  if (warehousesBtn) {
    warehousesBtn.addEventListener("click", async () => {
      const res = await postAuthedJson("/api/tiktok/getWarehouseList", {});
      setPre(warehousesPre, res);

      if (warehouseSelect) {
        const list = Array.isArray(res?.data?.list) ? res.data.list : [];
        warehouseSelect.innerHTML = '<option value="">选择仓库(可选)</option>';
        for (const w of list) {
          const opt = document.createElement("option");
          opt.value = String(w.id ?? "");
          opt.textContent = `${w.name ?? w.id ?? "-"}`;
          warehouseSelect.appendChild(opt);
        }
      }
    });
  }

  if (warehouseSelect) {
    warehouseSelect.addEventListener("change", () => {
      const skuWarehouse = document.getElementById("tiktok-sku-warehouse-id");
      if (skuWarehouse && warehouseSelect.value) skuWarehouse.value = warehouseSelect.value;
    });
  }

  if (createBtn) {
    createBtn.addEventListener("click", async () => {
      const catId = catOut.textContent.trim();
      if (!catId || catId === "-") {
        setPre(createPre, { code: "1", msg: "请选择末级类目(cat_id)" });
        return;
      }

      let extra = {};
      try {
        extra = parseJsonObject(document.getElementById("tiktok-extra-json")?.value);
      } catch {
        setPre(createPre, { code: "1", msg: "额外字段不是合法 JSON 对象" });
        return;
      }

      const payload = {
        goods_name: document.getElementById("tiktok-goods-name")?.value?.trim(),
        goods_sn: document.getElementById("tiktok-goods-sn")?.value?.trim(),
        ali_seller_sn: document.getElementById("tiktok-ali-seller-sn")?.value?.trim(),
        cat_id: catId,
        goods_brief: document.getElementById("tiktok-goods-brief")?.value?.trim(),
        package_weight: document.getElementById("tiktok-package-weight")?.value?.trim(),
        package_weight_unit: document.getElementById("tiktok-package-weight-unit")?.value?.trim(),
        package_width: document.getElementById("tiktok-package-width")?.value?.trim(),
        package_height: document.getElementById("tiktok-package-height")?.value?.trim(),
        package_length: document.getElementById("tiktok-package-length")?.value?.trim(),
        tiktok_product_attributes: ensureJsonString(document.getElementById("tiktok-attrs-json")?.value),
        goods_img_json: ensureJsonString(document.getElementById("tiktok-img-json")?.value),
        easyswitch: 0,
        sku_stock: document.getElementById("tiktok-sku-stock")?.value?.trim(),
        sku_price: document.getElementById("tiktok-sku-price")?.value?.trim(),
        sku_identifier_type: document.getElementById("tiktok-sku-identifier-type")?.value?.trim(),
        sku_identifier_code: document.getElementById("tiktok-sku-identifier-code")?.value?.trim(),
        sku_sn: document.getElementById("tiktok-sku-sn")?.value?.trim(),
        ...extra,
      };

      if (!parseTikTokAttrsJson().length) {
        setPre(createPre, { code: "1", msg: "请先选择并记录至少 1 项属性（在模板里点选即可）" });
        return;
      }
      if (!parseTikTokImgJson().length) {
        setPre(createPre, { code: "1", msg: "请先上传至少 1 张商品图片" });
        return;
      }

      const required = [
        "goods_name",
        "goods_sn",
        "cat_id",
        "goods_brief",
        "package_weight",
        "package_weight_unit",
        "package_width",
        "package_height",
        "package_length",
        "tiktok_product_attributes",
        "goods_img_json",
        "sku_stock",
        "sku_price",
        "sku_identifier_type",
        "sku_identifier_code",
        "sku_sn",
      ];
      const missing = required.filter((k) => !String(payload[k] ?? "").trim());
      if (missing.length) {
        setPre(createPre, { code: "1", msg: `缺少必填：${missing.join(", ")}` });
        return;
      }

      const res = await postAuthedJson("/api/tiktok/insert", payload);
      setPre(createPre, res);
      if (String(res?.code) === "0") {
        clearDraft();
        draftState = null;
        draftApplied = false;
      }
    });
  }
  if (selfCheckBtn) selfCheckBtn.addEventListener("click", runTikTokSelfCheck);

  if (stepBtn1) stepBtn1.addEventListener("click", () => tryGoStep(1));
  if (stepBtn2) stepBtn2.addEventListener("click", () => tryGoStep(2));
  if (stepBtn3) stepBtn3.addEventListener("click", () => tryGoStep(3));
  if (stepBtn4) stepBtn4.addEventListener("click", () => tryGoStep(4));
  if (stepBtn5) stepBtn5.addEventListener("click", () => tryGoStep(5));

  if (stepNext1) {
    stepNext1.addEventListener("click", async () => {
      const originalHtml = stepNext1.innerHTML;
      stepNext1.disabled = true;
      stepNext1.classList.add("opacity-70", "cursor-not-allowed");
      stepNext1.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-1"></i>加载中...';
      const ok = await ensureTemplateReady();
      stepNext1.innerHTML = originalHtml;
      stepNext1.disabled = false;
      stepNext1.classList.remove("opacity-70", "cursor-not-allowed");
      if (!ok) return;
      unlockToStep(2);
      setUploadStep(2);
    });
  }
  if (stepNext2) {
    stepNext2.addEventListener("click", () => {
      if (String(lastTemplateRes?.code ?? "") !== "0") {
        showTemplateMsg("\u8bf7\u5148\u83b7\u53d6\u5c5e\u6027\u6a21\u677f\u3002");
        return;
      }
      const missing = getRequiredAttrMissing();
      if (missing.length) {
        const names = missing.map((x) => x.name).filter(Boolean);
        const label = names.length ? names.slice(0, 6).join("\u3001") : "\u5fc5\u586b\u5c5e\u6027";
        showTemplateMsg(`\u8bf7\u5148\u9009\u62e9\u5fc5\u586b\u5c5e\u6027\uff1a${label}`);
        return;
      }
      const missingSku = validateSkuCoreFields();
      if (missingSku.length) {
        const label = missingSku.map((x) => x.label).join("\u3001");
        showTemplateMsg(`\u8bf7\u5148\u586b\u5199 SKU \u6838\u5fc3\u5b57\u6bb5\uff1a${label}`);
        return;
      }
      unlockToStep(3);
      setUploadStep(3);
    });
  }
  if (stepNext3) {
    stepNext3.addEventListener("click", () => {
      const imgs = parseTikTokImgJson();
      if (!imgs.length && uploadPendingCount === 0) {
        showUploadMsg("\u8bf7\u5148\u4e0a\u4f20\u5546\u54c1\u56fe\u7247\u3002");
        return;
      }
      const missingCerts = getRequiredCertMissing();
      if (missingCerts.length) {
        const names = missingCerts.map((c) => c.name || c.id).filter(Boolean);
        const label = names.length ? names.slice(0, 6).join("\u3001") : "\u8bc1\u4e66";
        showUploadMsg(`\u8bf7\u5148\u4e0a\u4f20\u8bc1\u4e66\uff1a${label}`);
        return;
      }
      showUploadMsg("");
      unlockToStep(4);
      setUploadStep(4);
    });
  }
  if (stepNext4) {
    stepNext4.addEventListener("click", () => {
      const descPanel = document.getElementById("tiktok-panel-desc");
      let descInlineMsg = descPanel?.querySelector?.("[data-step4-inline-msg]");
      if (descPanel && !descInlineMsg) {
        descInlineMsg = document.createElement("div");
        descInlineMsg.dataset.step4InlineMsg = "1";
        descInlineMsg.className =
          "hidden mt-2 text-xs px-3 py-2 rounded-xl border border-amber-200 bg-amber-50 text-amber-700";
        descPanel.appendChild(descInlineMsg);
      }
      if (!isDescOk()) {
        if (descInlineMsg) {
          const missing = getMissingDescFields();
          descInlineMsg.textContent = missing.length
            ? `请先填写：${missing.join("、")}`
            : "请先填写商品名称/货号/描述/包装信息。";
          descInlineMsg.classList.remove("hidden");
        }
        return;
      }
      if (descInlineMsg) descInlineMsg.classList.add("hidden");
      unlockToStep(5);
      setUploadStep(5);
      const step5Panel = document.getElementById("tiktok-panel-submit");
      if (step5Panel && step5Panel.classList.contains("hidden") && descInlineMsg) {
        descInlineMsg.textContent = "步骤 5 未显示，请刷新页面或检查步骤模板是否完整。";
        descInlineMsg.classList.remove("hidden");
      }
    });
  }
  if (stepBack2) stepBack2.addEventListener("click", () => {
    setUploadStep(1);
  });
  if (stepBack3) stepBack3.addEventListener("click", () => {
    setUploadStep(2);
  });
  if (stepBack4) stepBack4.addEventListener("click", () => {
    setUploadStep(3);
  });
  setUploadStep(1);
  // Initial UI render
  renderAttrSummary();
  renderTikTokImagePreview();
  renderCertifications();
  [
    "tiktok-goods-name",
    "tiktok-goods-sn",
    "tiktok-goods-brief",
    "tiktok-package-weight",
    "tiktok-package-weight-unit",
    "tiktok-package-width",
    "tiktok-package-height",
    "tiktok-package-length",
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("input", () => {
      const descPanel = document.getElementById("tiktok-panel-desc");
      const descInlineMsg = descPanel?.querySelector?.("[data-step4-inline-msg]");
      if (descInlineMsg && isDescOk()) descInlineMsg.classList.add("hidden");
      renderTikTokStepper();
    });
    el.addEventListener("change", renderTikTokStepper);
  });
}
