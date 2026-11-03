import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  LayoutDashboard,
  Armchair,
  UtensilsCrossed,
  Receipt,
  Settings,
  Globe,
  Plus,
  Trash2,
  Printer,
  Download,
  X,
  Minus,
  Check,
  Sun,
  Moon,
  Coffee,
  Leaf,
  Bluetooth,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  Smartphone,
  Calendar,
  Clock,
  Edit2,
  RotateCcw,
  BarChart3,
  Filter
} from 'lucide-react';

// Translations Dictionary
const TRANSLATIONS = {
  my: {
    tab_dash: "ခွဲခြမ်းစိတ်ဖြာ / မှတ်တမ်း",
    tab_pos: "စားပွဲများ",
    tab_menu: "မီနူးစီမံရန်",
    tab_hist: "ဘောက်ချာမှတ်တမ်း",
    tab_set: "ဆိုင်ဆက်တင်",
    dash_title: "အရောင်း ခွဲခြမ်းစိတ်ဖြာမှု (Sales Analysis)",
    total_sales: "စုစုပေါင်း ရောင်းရငွေ",
    total_vouchers: "ဘောက်ချာ အရေအတွက်",
    avg_voucher: "ဘောက်ချာ ပျမ်းမျှတန်ဖိုး",
    top_item: "အရောင်းရဆုံး ပစ္စည်း",
    top_cat: "အရောင်းရဆုံး ကဏ္ဍ",
    active_tables: "လက်ရှိ မှာယူထားသော စားပွဲ",
    date_filter: "ရက်စွဲရွေးချယ်ရန်",
    filter_today: "ယနေ့ (Today)",
    filter_yesterday: "မနေ့က (Yesterday)",
    filter_7days: "ပြီးခဲ့သည့် ၇ ရက်",
    filter_month: "ဤလ (This Month)",
    filter_all: "ရက်စွဲအားလုံး",
    filter_custom: "ရက်စွဲ သတ်မှတ်မည်",
    pie_title: "ကဏ္ဍအလိုက် ရောင်းအား ဝေစု",
    bar_title: "အရောင်းရဆုံး ထိပ်တန်း မီနူးများ",
    time_breakdown: "အချိန်အလိုက် ရောင်းအား (Time Breakdown)",
    daily_trend: "ရက်အလိုက် ရောင်းအား အနှစ်ချုပ် (Daily Summary)",
    pos_title: "စားပွဲများ ရွေးချယ်ပါ",
    free: "လွတ်သည်",
    occupied: "လူရှိသည်",
    menu_title: "မီနူး စီမံခန့်ခွဲမှု",
    add_cat: "ကဏ္ဍ အသစ်ထည့်ရန်",
    cat_ph: "ဥပမာ - အအေး / အကြော်",
    add_btn: "ထည့်မည်",
    add_menu: "မီနူး အသစ်ထည့်ရန်",
    name: "အမည်",
    price: "ဈေးနှုန်း (ကျပ်)",
    category: "ကဏ္ဍ",
    icon: "ပုံစံ (Icon/Emoji)",
    save: "သိမ်းမည်",
    curr_menu: "လက်ရှိ မီနူးများ",
    clear_demo: "Demo Data အားလုံးဖျက်မည်",
    hist_title: "ရောင်းအား ဘောက်ချာမှတ်တမ်း",
    clear_all: "မှတ်တမ်းအားလုံးဖျက်မည်",
    time: "အချိန်",
    voucher_no: "ဘောက်ချာ No.",
    table: "စားပွဲ",
    amount: "ကျသင့်ငွေ",
    action: "လုပ်ဆောင်ချက်",
    no_record: "ရွေးချယ်ထားသော ရက်စွဲတွင် အရောင်းမှတ်တမ်း မရှိသေးပါ။",
    set_title: "ဆိုင် ဆက်တင်များ",
    general: "အထွေထွေ အချက်အလက်",
    shop_name: "သင့်ဆိုင်အမည် (Store Name)",
    edit_name: "ဆိုင်အမည် ပြင်ရန်",
    table_count: "စားပွဲ အရေအတွက်",
    theme_title: "နောက်ခံ အရောင် (Theme)",
    t_light: "လင်း (Light)",
    t_dark: "မှောင် (Dark)",
    t_warm: "နွေးထွေး (Warm)",
    t_green: "စိမ်းလန်း (Green)",
    save_set: "ပြင်ဆင်မှုများကို သိမ်းမည်",
    install_app: "App အဖြစ် Install လုပ်ရန်",
    bt_printer: "Bluetooth Thermal ပရင်တာ ချိတ်ရန်",
    bt_connected: "ပရင်တာ ချိတ်ဆက်ပြီးပါပြီ",
    bt_disconnected: "ချိတ်ဆက်မထားပါ",
    bt_error: "ချိတ်ဆက်မှု မအောင်မြင်ပါ သို့မဟုတ် Browser ပံ့ပိုးမှုမရှိပါ",
    table_no: "စားပွဲ",
    all: "အားလုံး",
    cart_title: "ယခု မှာယူထားသော စာရင်း",
    total: "စုစုပေါင်း",
    print_btn: "ဘောက်ချာထုတ် / ရှင်းမည်",
    empty_cart: "ယခုစားပွဲတွင် မှာယူထားခြင်း မရှိသေးပါ။",
    confirm_clear: "မှတ်တမ်းအားလုံးကို ဖျက်ရန် သေချာပါသလား?",
    confirm_clear_demo: "Demo မီနူးနှင့် အချက်အလက်အားလုံးကို ဖျက်ပစ်ရန် သေချာပါသလား? သင့်စိတ်ကြိုက် မီနူးအသစ်များ ထည့်သွင်းနိုင်ပါပြီ။",
    confirm_delete: "ဤမီနူးကို ဖျက်ရန် သေချာပါသလား?",
    cancel: "မလုပ်ပါ",
    ok: "သေချာသည်",
    saved: "အောင်မြင်စွာ သိမ်းဆည်းပြီးပါပြီ",
    pwa_title: "POS App အဖြစ် သွင်းယူပါ",
    pwa_desc: "အင်တာနက်မလိုဘဲ အမြန်ဖွင့်ရန်နှင့် ဘောက်ချာထုတ်ရန် ဖုန်း/ကွန်ပျူတာထဲ ထည့်သွင်းပါ",
    install_btn: "Install လုပ်မည်",
    dismiss: "ပိတ်မည်",
    receipt_title: "ငွေရပြေစာ",
    items_count: "ခု",
    reprint: "ပြန်လည်ထုတ်မည်",
    clean_slate_notice: "မီနူးမရှိသေးပါ။ မီနူးအသစ်ထည့်ရန် အပေါ်က Form တွင် ဖြည့်ပါ"
  },
  en: {
    tab_dash: "Analytics & History",
    tab_pos: "Tables",
    tab_menu: "Menu Admin",
    tab_hist: "Vouchers",
    tab_set: "Settings",
    dash_title: "Sales Analysis & Insights",
    total_sales: "Total Sales",
    total_vouchers: "Total Orders",
    avg_voucher: "Avg. Ticket Value",
    top_item: "Top Selling Item",
    top_cat: "Top Category",
    active_tables: "Active Tables",
    date_filter: "Filter by Date",
    filter_today: "Today",
    filter_yesterday: "Yesterday",
    filter_7days: "Last 7 Days",
    filter_month: "This Month",
    filter_all: "All Time",
    filter_custom: "Custom Date",
    pie_title: "Sales by Category",
    bar_title: "Top Best Sellers",
    time_breakdown: "Sales by Time of Day",
    daily_trend: "Daily Sales Summary",
    pos_title: "Select Table",
    free: "Free",
    occupied: "Occupied",
    menu_title: "Menu Management",
    add_cat: "Add Category",
    cat_ph: "e.g. Drinks / Fast Food",
    add_btn: "Add",
    add_menu: "Add Menu Item",
    name: "Name",
    price: "Price (Ks)",
    category: "Category",
    icon: "Icon/Emoji",
    save: "Save",
    curr_menu: "Current Menu Items",
    clear_demo: "Clear All Demo Data",
    hist_title: "Voucher History",
    clear_all: "Clear All History",
    time: "Time",
    voucher_no: "Voucher No.",
    table: "Table",
    amount: "Amount",
    action: "Action",
    no_record: "No sales records found for this period.",
    set_title: "Store Settings",
    general: "General Info",
    shop_name: "Your Store Name",
    edit_name: "Edit Shop Name",
    table_count: "Table Count",
    theme_title: "Theme Appearance",
    t_light: "Light",
    t_dark: "Dark",
    t_warm: "Warm",
    t_green: "Green",
    save_set: "Save Settings",
    install_app: "Install as PWA App",
    bt_printer: "Connect Bluetooth Printer",
    bt_connected: "Printer Connected",
    bt_disconnected: "Not Connected",
    bt_error: "Connection Failed or Web Bluetooth Not Supported",
    table_no: "Table",
    all: "All",
    cart_title: "Current Order Cart",
    total: "Total",
    print_btn: "Checkout & Print",
    empty_cart: "No orders for this table yet.",
    confirm_clear: "Are you sure you want to clear all history?",
    confirm_clear_demo: "Are you sure to delete all demo data? You can start with a clean slate for your own menu.",
    confirm_delete: "Are you sure you want to delete this menu item?",
    cancel: "Cancel",
    ok: "Confirm",
    saved: "Saved successfully!",
    pwa_title: "Install POS App",
    pwa_desc: "Install on your home screen for quick offline access and thermal printing",
    install_btn: "Install Now",
    dismiss: "Later",
    receipt_title: "Sales Receipt",
    items_count: "items",
    reprint: "Reprint",
    clean_slate_notice: "No menu items yet. Use the form above to add your own menu."
  }
};

const DEFAULT_CATEGORIES = ['အစားအသောက်', 'သောက်စရာ', 'အဆာပြေ'];
const DEFAULT_MENU = [
  { id: '1', name: 'ကြက်ဆီထမင်း', category: 'အစားအသောက်', price: 3500, icon: '🍛' },
  { id: '2', name: 'ရေခဲကော်ဖီ', category: 'သောက်စရာ', price: 2500, icon: '☕' },
  { id: '3', name: 'အာလူးကြော်', category: 'အဆာပြေ', price: 1500, icon: '🍟' }
];

export default function App() {
  // Safe LocalStorage Helper
  const loadStorage = (key, fallback) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  };

  const saveStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn("Storage write failed", e);
    }
  };

  // State Management
  const [lang, setLang] = useState(() => loadStorage('pos_lang', 'my'));
  const [activeTab, setActiveTab] = useState('pos');
  // Store Name: default to custom user-friendly store name instead of fixed brand
  const [storeName, setStoreName] = useState(() => loadStorage('pos_name', 'My Restaurant POS'));
  const [theme, setTheme] = useState(() => loadStorage('pos_theme', 'light'));
  const [tableCount, setTableCount] = useState(() => loadStorage('pos_tableCount', 16));
  const [categories, setCategories] = useState(() => loadStorage('pos_categories', DEFAULT_CATEGORIES));
  const [menu, setMenu] = useState(() => loadStorage('pos_menu', DEFAULT_MENU));
  const [activeOrders, setActiveOrders] = useState(() => loadStorage('pos_activeOrders', {}));
  const [history, setHistory] = useState(() => loadStorage('pos_history', []));

  // Date Filter State for Daily Sales Analysis
  const [dateFilter, setDateFilter] = useState('today'); // 'today', 'yesterday', '7days', 'month', 'all', 'custom'
  const [customDate, setCustomDate] = useState(() => new Date().toISOString().slice(0, 10));

  // Modal & Selection States
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [toastMessage, setToastMessage] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [showEditNameModal, setShowEditNameModal] = useState(false);
  const [nameInput, setNameInput] = useState(storeName);

  // Settings inputs
  const [tempStoreName, setTempStoreName] = useState(storeName);
  const [tempTableCount, setTempTableCount] = useState(tableCount);
  const [newCatName, setNewCatName] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemCategory, setNewItemCategory] = useState(categories[0] || 'အထွေထွေ');
  const [newItemIcon, setNewItemIcon] = useState('🍲');

  // Thermal Receipt State for Print
  const [printReceiptData, setPrintReceiptData] = useState(null);

  // Bluetooth Printer State
  const [btStatus, setBtStatus] = useState('disconnected');
  const [btDeviceName, setBtDeviceName] = useState('');
  const btCharacteristicRef = useRef(null);

  // PWA Install Banner State
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPwaBanner, setShowPwaBanner] = useState(false);

  // Translation helper
  const t = (key) => TRANSLATIONS[lang]?.[key] || key;
  const formatMoney = (val) => Number(val || 0).toLocaleString() + ' Ks';

  // Sync to Storage
  useEffect(() => { saveStorage('pos_lang', lang); }, [lang]);
  useEffect(() => { saveStorage('pos_name', storeName); }, [storeName]);
  useEffect(() => { saveStorage('pos_theme', theme); }, [theme]);
  useEffect(() => { saveStorage('pos_tableCount', tableCount); }, [tableCount]);
  useEffect(() => { saveStorage('pos_categories', categories); }, [categories]);
  useEffect(() => { saveStorage('pos_menu', menu); }, [menu]);
  useEffect(() => { saveStorage('pos_activeOrders', activeOrders); }, [activeOrders]);
  useEffect(() => { saveStorage('pos_history', history); }, [history]);

  // PWA Install Prompt Listener
  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      const isDismissed = loadStorage('pwa_banner_dismissed', false);
      if (!isDismissed) {
        setShowPwaBanner(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const triggerPwaInstall = async () => {
    if (!deferredPrompt) {
      showToast(lang === 'my' ? "Browser က Install ခွင့်ပြုချက် အသင့်မဖြစ်သေးပါ" : "Install prompt not ready in current browser");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPwaBanner(false);
      setDeferredPrompt(null);
      showToast(lang === 'my' ? "App ထည့်သွင်းခြင်း အောင်မြင်ပါသည်" : "App installed successfully!");
    }
  };

  const dismissPwaBanner = () => {
    setShowPwaBanner(false);
    saveStorage('pwa_banner_dismissed', true);
  };

  // Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Web Bluetooth Thermal Printer logic
  const connectBluetoothPrinter = async () => {
    try {
      if (!navigator.bluetooth) {
        throw new Error("Web Bluetooth not supported");
      }
      setBtStatus('connecting');
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['000018f0-0000-1000-8000-00805f9b34fb'] }],
        optionalServices: ['000018f0-0000-1000-8000-00805f9b34fb']
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService('000018f0-0000-1000-8000-00805f9b34fb');
      const characteristic = await service.getCharacteristic('00002af1-0000-1000-8000-00805f9b34fb');

      btCharacteristicRef.current = characteristic;
      setBtDeviceName(device.name || "58mm POS Printer");
      setBtStatus('connected');
      showToast(t('bt_connected'));
    } catch (err) {
      console.warn("BT connection failed", err);
      setBtStatus('error');
      showToast(t('bt_error'));
    }
  };

  const printViaBluetooth = async (rawText) => {
    if (!btCharacteristicRef.current) return false;
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode('\x1B\x40' + rawText + '\n\n\n\x1D\x56\x00');
      for (let i = 0; i < data.length; i += 100) {
        await btCharacteristicRef.current.writeValue(data.slice(i, i + 100));
      }
      return true;
    } catch (e) {
      console.error("Bluetooth print failed", e);
      return false;
    }
  };

  // Table Calculations
  const activeTableCount = useMemo(() => {
    return Object.keys(activeOrders).filter(tId => {
      const order = activeOrders[tId];
      return order && Object.values(order).some(qty => qty > 0);
    }).length;
  }, [activeOrders]);

  const getTableTotal = (tableId) => {
    const order = activeOrders[tableId] || {};
    let sum = 0;
    for (const [itemId, qty] of Object.entries(order)) {
      const item = menu.find(m => m.id === itemId);
      if (item && qty > 0) sum += item.price * qty;
    }
    return sum;
  };

  // Cart operations
  const addToCart = (itemId) => {
    if (!selectedTable) return;
    setActiveOrders(prev => {
      const currentTableOrder = { ...(prev[selectedTable] || {}) };
      currentTableOrder[itemId] = (currentTableOrder[itemId] || 0) + 1;
      return { ...prev, [selectedTable]: currentTableOrder };
    });
  };

  const updateCartQty = (itemId, delta) => {
    if (!selectedTable) return;
    setActiveOrders(prev => {
      const currentTableOrder = { ...(prev[selectedTable] || {}) };
      const newQty = (currentTableOrder[itemId] || 0) + delta;
      if (newQty <= 0) {
        delete currentTableOrder[itemId];
      } else {
        currentTableOrder[itemId] = newQty;
      }
      return { ...prev, [selectedTable]: currentTableOrder };
    });
  };

  // Checkout and Thermal Print
  const handleCheckout = async () => {
    if (!selectedTable) return;
    const currentOrder = activeOrders[selectedTable] || {};
    const itemsList = [];
    let total = 0;

    for (const [itemId, qty] of Object.entries(currentOrder)) {
      const item = menu.find(m => m.id === itemId);
      if (item && qty > 0) {
        const sub = item.price * qty;
        total += sub;
        itemsList.push({ id: item.id, name: item.name, price: item.price, qty, subtotal: sub });
      }
    }

    if (itemsList.length === 0) return;

    const voucherId = 'INV-' + Math.floor(100000 + Math.random() * 900000);
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const isoDate = now.toISOString().slice(0, 10);
    const hour = now.getHours();

    const orderRecord = {
      id: voucherId,
      date: dateFormatted,
      isoDate: isoDate,
      hour: hour,
      timestamp: now.getTime(),
      tableId: selectedTable,
      items: itemsList,
      total: total
    };

    // Save to history & clear table
    setHistory(prev => [orderRecord, ...prev]);
    setActiveOrders(prev => {
      const next = { ...prev };
      delete next[selectedTable];
      return next;
    });

    setSelectedTable(null);

    // Bluetooth print text
    let btText = `${storeName}\nDate: ${dateFormatted}\nTable: ${selectedTable}  No: ${voucherId}\n--------------------------------\n`;
    itemsList.forEach(i => {
      btText += `${i.name}\n  ${i.qty} x ${i.price.toLocaleString()} = ${i.subtotal.toLocaleString()} Ks\n`;
    });
    btText += `--------------------------------\nTOTAL: ${total.toLocaleString()} Ks\nThank You! Please come again.\n`;

    const btSent = await printViaBluetooth(btText);
    if (!btSent) {
      // Fallback to thermal browser print
      setPrintReceiptData(orderRecord);
      setTimeout(() => {
        window.print();
      }, 300);
    } else {
      showToast(lang === 'my' ? "ဘောက်ချာ ပရင့်ထုတ်ပြီးပါပြီ" : "Receipt printed via Bluetooth!");
    }
  };

  // Menu Admin Operations
  const handleAddCategory = () => {
    const trimmed = newCatName.trim();
    if (trimmed && !categories.includes(trimmed)) {
      setCategories(prev => [...prev, trimmed]);
      setNewCatName('');
      showToast(t('saved'));
    }
  };

  const handleRemoveCategory = (catToRemove) => {
    setCategories(prev => prev.filter(c => c !== catToRemove));
    if (newItemCategory === catToRemove) {
      setNewItemCategory(categories.find(c => c !== catToRemove) || 'အထွေထွေ');
    }
  };

  const handleAddMenuItem = () => {
    if (!newItemName.trim() || !newItemPrice) return;
    const item = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      price: parseFloat(newItemPrice) || 0,
      category: newItemCategory || categories[0] || 'အထွေထွေ',
      icon: newItemIcon.trim() || '🍲'
    };
    setMenu(prev => [...prev, item]);
    setNewItemName('');
    setNewItemPrice('');
    showToast(t('saved'));
  };

  const handleDeleteMenuItem = (id) => {
    setConfirmDialog({
      title: t('confirm_delete'),
      onConfirm: () => {
        setMenu(prev => prev.filter(m => m.id !== id));
        setConfirmDialog(null);
        showToast(t('saved'));
      }
    });
  };

  // Clear Demo Data: Wipe demo items and categories to start completely fresh
  const handleClearDemoData = () => {
    setConfirmDialog({
      title: t('confirm_clear_demo'),
      onConfirm: () => {
        setMenu([]);
        setCategories(['အထွေထွေ']);
        setActiveOrders({});
        setConfirmDialog(null);
        showToast(lang === 'my' ? "Demo Data များကို အောင်မြင်စွာ ဖျက်ပြီးပါပြီ" : "Demo data cleared! You can now add your own menu.");
      }
    });
  };

  const handleClearHistory = () => {
    setConfirmDialog({
      title: t('confirm_clear'),
      onConfirm: () => {
        setHistory([]);
        setConfirmDialog(null);
        showToast(t('saved'));
      }
    });
  };

  const handleSaveSettings = () => {
    if (tempStoreName.trim()) {
      setStoreName(tempStoreName.trim());
      setNameInput(tempStoreName.trim());
    }
    const count = parseInt(tempTableCount, 10);
    if (count && count > 0 && count <= 100) setTableCount(count);
    showToast(t('saved'));
  };

  const handleQuickRename = () => {
    if (nameInput.trim()) {
      setStoreName(nameInput.trim());
      setTempStoreName(nameInput.trim());
      setShowEditNameModal(false);
      showToast(t('saved'));
    }
  };

  // ==========================================
  // DAILY SALES & TEMPORAL ANALYSIS LOGIC
  // ==========================================
  const filteredHistory = useMemo(() => {
    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);

    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    return history.filter(order => {
      // Extract ISO date from record or parse date string
      let orderDate = order.isoDate;
      if (!orderDate && order.timestamp) {
        orderDate = new Date(order.timestamp).toISOString().slice(0, 10);
      }
      if (!orderDate && order.date) {
        // Fallback for older format DD/MM/YYYY
        const parts = order.date.split(' ')[0].split('/');
        if (parts.length === 3) {
          orderDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
        }
      }

      if (!orderDate) return true;

      switch (dateFilter) {
        case 'today':
          return orderDate === todayStr;
        case 'yesterday':
          return orderDate === yesterdayStr;
        case '7days': {
          const d = new Date(orderDate);
          return d >= sevenDaysAgo;
        }
        case 'month': {
          const d = new Date(orderDate);
          return d >= firstDayOfMonth;
        }
        case 'custom':
          return orderDate === customDate;
        case 'all':
        default:
          return true;
      }
    });
  }, [history, dateFilter, customDate]);

  // Aggregated analytics for selected period
  const dashboardStats = useMemo(() => {
    let totalSales = 0;
    const catMap = {};
    const itemMap = {};
    const hourMap = {
      morning: { label: 'မနက် (6AM - 12PM)', sales: 0, orders: 0 },
      afternoon: { label: 'နေ့လယ် (12PM - 5PM)', sales: 0, orders: 0 },
      evening: { label: 'ညနေ (5PM - 10PM)', sales: 0, orders: 0 },
      night: { label: 'ည (10PM - 6AM)', sales: 0, orders: 0 }
    };
    const dailyMap = {};

    filteredHistory.forEach(order => {
      totalSales += order.total || 0;

      // Group by daily date
      const dKey = order.isoDate || (order.date ? order.date.split(' ')[0] : 'Other');
      if (!dailyMap[dKey]) dailyMap[dKey] = { date: dKey, sales: 0, orders: 0 };
      dailyMap[dKey].sales += order.total || 0;
      dailyMap[dKey].orders += 1;

      // Hour grouping
      const h = order.hour !== undefined ? order.hour : 12;
      if (h >= 6 && h < 12) {
        hourMap.morning.sales += order.total || 0;
        hourMap.morning.orders += 1;
      } else if (h >= 12 && h < 17) {
        hourMap.afternoon.sales += order.total || 0;
        hourMap.afternoon.orders += 1;
      } else if (h >= 17 && h < 22) {
        hourMap.evening.sales += order.total || 0;
        hourMap.evening.orders += 1;
      } else {
        hourMap.night.sales += order.total || 0;
        hourMap.night.orders += 1;
      }

      (order.items || []).forEach(item => {
        if (!itemMap[item.name]) {
          itemMap[item.name] = { qty: 0, revenue: 0, category: '' };
        }
        itemMap[item.name].qty += item.qty;
        itemMap[item.name].revenue += item.subtotal;

        const refItem = menu.find(m => m.name === item.name);
        const cat = refItem ? refItem.category : 'Others';
        itemMap[item.name].category = cat;
        catMap[cat] = (catMap[cat] || 0) + item.subtotal;
      });
    });

    let topCat = '-';
    let maxCatSales = 0;
    for (const [c, val] of Object.entries(catMap)) {
      if (val > maxCatSales) {
        maxCatSales = val;
        topCat = c;
      }
    }

    // Sort items by revenue / quantity
    const sortedItems = Object.entries(itemMap)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.qty - a.qty);

    const topItem = sortedItems.length > 0 ? sortedItems[0].name : '-';
    const totalOrders = filteredHistory.length;
    const avgVoucher = totalOrders > 0 ? Math.round(totalSales / totalOrders) : 0;

    // Daily trends list sorted by date descending
    const dailyTrends = Object.values(dailyMap).sort((a, b) => b.date.localeCompare(a.date));

    return {
      totalSales,
      totalOrders,
      avgVoucher,
      topCat,
      topItem,
      catMap,
      topItems: sortedItems.slice(0, 5),
      hourMap,
      dailyTrends
    };
  }, [filteredHistory, menu]);

  // Color Theme definitions
  const themeStyles = useMemo(() => {
    switch (theme) {
      case 'dark':
        return {
          bg: 'bg-slate-950 text-slate-100',
          card: 'bg-slate-900 border-slate-800 text-slate-100',
          cardSubtle: 'bg-slate-800/80 border-slate-700/80',
          nav: 'bg-slate-900/90 border-slate-800',
          accent: 'text-indigo-400',
          buttonPrimary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
          input: 'bg-slate-800 border-slate-700 text-slate-100 focus:ring-indigo-500'
        };
      case 'warm':
        return {
          bg: 'bg-amber-50 text-amber-950',
          card: 'bg-amber-100/70 border-amber-300/80 text-amber-950 shadow-sm',
          cardSubtle: 'bg-amber-200/40 border-amber-300/60',
          nav: 'bg-amber-100/95 border-amber-200',
          accent: 'text-amber-700',
          buttonPrimary: 'bg-amber-600 hover:bg-amber-700 text-white',
          input: 'bg-amber-50/80 border-amber-300 text-amber-950 focus:ring-amber-500'
        };
      case 'green':
        return {
          bg: 'bg-emerald-50 text-emerald-950',
          card: 'bg-emerald-100/70 border-emerald-300/80 text-emerald-950 shadow-sm',
          cardSubtle: 'bg-emerald-200/40 border-emerald-300/60',
          nav: 'bg-emerald-100/95 border-emerald-200',
          accent: 'text-emerald-700',
          buttonPrimary: 'bg-emerald-600 hover:bg-emerald-700 text-white',
          input: 'bg-emerald-50/80 border-emerald-300 text-emerald-950 focus:ring-emerald-500'
        };
      case 'light':
      default:
        return {
          bg: 'bg-slate-50 text-slate-900',
          card: 'bg-white border-slate-200 text-slate-900 shadow-sm',
          cardSubtle: 'bg-slate-100/80 border-slate-200/70',
          nav: 'bg-white/95 border-slate-200',
          accent: 'text-blue-600',
          buttonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
          input: 'bg-white border-slate-300 text-slate-900 focus:ring-blue-500'
        };
    }
  }, [theme]);

  // Active items for modal cart
  const currentTableOrder = selectedTable ? (activeOrders[selectedTable] || {}) : {};
  const currentTableTotal = selectedTable ? getTableTotal(selectedTable) : 0;
  const filteredMenuItems = useMemo(() => {
    if (selectedCategory === 'All') return menu;
    return menu.filter(m => m.category === selectedCategory);
  }, [menu, selectedCategory]);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${themeStyles.bg}`}>
      
      {/* 1. TOP HEADER (BRAND & QUICK RENAME) */}
      <header className={`sticky top-0 z-30 px-4 py-3 border-b backdrop-blur-md flex items-center justify-between ${themeStyles.nav}`}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 group cursor-pointer" onClick={() => setShowEditNameModal(true)}>
              <h1 className="text-base sm:text-lg md:text-xl font-bold tracking-tight truncate max-w-[180px] sm:max-w-xs md:max-w-md">
                {storeName}
              </h1>
              <Edit2 className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 text-blue-500 transition" />
            </div>
            <p className="text-xs opacity-70 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              {activeTableCount} {t('occupied')} / {tableCount} {t('table')}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Quick Install Banner Trigger if prompt available */}
          {deferredPrompt && (
            <button
              onClick={triggerPwaInstall}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 transition"
              title={t('install_app')}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>
          )}

          {/* Language Toggle */}
          <button
            onClick={() => setLang(l => (l === 'my' ? 'en' : 'my'))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition hover:bg-black/5 dark:hover:bg-white/10"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'my' ? 'EN' : 'မြန်မာ'}</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN CONTENT VIEWPORT */}
      <main className="flex-1 overflow-y-auto pb-24 md:pb-28 p-4 max-w-7xl w-full mx-auto">
        
        {/* ===================== VIEW 1: POS TABLES ===================== */}
        {activeTab === 'pos' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Armchair className="w-5 h-5 text-blue-500" />
                  <span>{t('pos_title')}</span>
                </h2>
                <p className="text-xs opacity-70">စားပွဲခုံကို နှိပ်၍ အော်ဒါယူပါ သို့မဟုတ် ဘောက်ချာထုတ်ပါ</p>
              </div>

              {/* Status Indicators */}
              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  {t('free')} ({tableCount - activeTableCount})
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                  {t('occupied')} ({activeTableCount})
                </span>
              </div>
            </div>

            {/* Tables Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4 pt-2">
              {Array.from({ length: tableCount }, (_, i) => {
                const tableId = (i + 1).toString();
                const total = getTableTotal(tableId);
                const isOccupied = total > 0;

                return (
                  <button
                    key={tableId}
                    onClick={() => {
                      setSelectedTable(tableId);
                      setSelectedCategory('All');
                    }}
                    className={`relative aspect-square rounded-2xl p-3 flex flex-col justify-between items-center transition-all duration-150 border active:scale-95 shadow-sm group ${
                      isOccupied
                        ? 'bg-gradient-to-br from-orange-500 to-amber-600 text-white border-orange-600 shadow-orange-500/20'
                        : `${themeStyles.card} hover:border-blue-500 hover:shadow-md`
                    }`}
                  >
                    <div className="w-full flex justify-between items-center text-xs">
                      <span className={`font-mono px-2 py-0.5 rounded-full font-bold ${isOccupied ? 'bg-black/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                        #{tableId}
                      </span>
                      {isOccupied && (
                        <span className="w-2 h-2 rounded-full bg-yellow-300 animate-ping"></span>
                      )}
                    </div>

                    <div className="flex flex-col items-center my-auto">
                      <Armchair className={`w-8 h-8 sm:w-10 sm:h-10 transition-transform group-hover:scale-110 ${isOccupied ? 'text-white' : 'text-blue-500 opacity-80'}`} />
                      <span className="text-sm font-bold mt-1">
                        {t('table')} {tableId}
                      </span>
                    </div>

                    <div className="w-full text-center">
                      {isOccupied ? (
                        <span className="inline-block text-xs font-bold bg-black/30 px-2 py-1 rounded-lg w-full truncate">
                          {total.toLocaleString()} Ks
                        </span>
                      ) : (
                        <span className="text-[11px] opacity-60 font-medium">
                          {t('free')}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================== VIEW 2: DAILY SALES & ADVANCED ANALYTICS ===================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* Header & Date Filter Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-black/10 dark:border-white/10">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  <span>{t('dash_title')}</span>
                </h2>
                <p className="text-xs opacity-70">တစ်ရက်စာ ရောင်းအားနှင့် မည်သည့်ပစ္စည်းများ အရောင်းရဆုံးဖြစ်သည်ကို ခွဲခြမ်းစိတ်ဖြာပါ</p>
              </div>

              {/* Date Filter Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 bg-black/5 dark:bg-white/5 p-1.5 rounded-2xl">
                <button
                  onClick={() => setDateFilter('today')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    dateFilter === 'today' ? 'bg-blue-600 text-white shadow-sm' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {t('filter_today')}
                </button>
                <button
                  onClick={() => setDateFilter('yesterday')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    dateFilter === 'yesterday' ? 'bg-blue-600 text-white shadow-sm' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {t('filter_yesterday')}
                </button>
                <button
                  onClick={() => setDateFilter('7days')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    dateFilter === '7days' ? 'bg-blue-600 text-white shadow-sm' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {t('filter_7days')}
                </button>
                <button
                  onClick={() => setDateFilter('month')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    dateFilter === 'month' ? 'bg-blue-600 text-white shadow-sm' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {t('filter_month')}
                </button>
                <button
                  onClick={() => setDateFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    dateFilter === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {t('filter_all')}
                </button>
                <div className="flex items-center gap-1 pl-1">
                  <input
                    type="date"
                    value={customDate}
                    onChange={(e) => {
                      setCustomDate(e.target.value);
                      setDateFilter('custom');
                    }}
                    className={`px-2 py-1 text-xs rounded-xl border outline-none font-medium cursor-pointer ${themeStyles.input}`}
                  />
                </div>
              </div>
            </div>

            {/* KPI Summary Cards for Selected Period */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`p-4 rounded-2xl border flex items-center justify-between ${themeStyles.card}`}>
                <div>
                  <p className="text-xs opacity-70 font-semibold">{t('total_sales')}</p>
                  <p className="text-2xl font-black mt-1 text-emerald-600">
                    {formatMoney(dashboardStats.totalSales)}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              <div className={`p-4 rounded-2xl border flex items-center justify-between ${themeStyles.card}`}>
                <div>
                  <p className="text-xs opacity-70 font-semibold">{t('total_vouchers')}</p>
                  <p className="text-2xl font-black mt-1 text-blue-600">
                    {dashboardStats.totalOrders}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
                  <Receipt className="w-6 h-6" />
                </div>
              </div>

              <div className={`p-4 rounded-2xl border flex items-center justify-between ${themeStyles.card}`}>
                <div>
                  <p className="text-xs opacity-70 font-semibold">{t('avg_voucher')}</p>
                  <p className="text-xl font-black mt-1 text-indigo-600">
                    {formatMoney(dashboardStats.avgVoucher)}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>

              <div className={`p-4 rounded-2xl border flex items-center justify-between ${themeStyles.card}`}>
                <div>
                  <p className="text-xs opacity-70 font-semibold">{t('top_item')}</p>
                  <p className="text-xl font-black mt-1 text-purple-600 truncate max-w-[140px]">
                    {dashboardStats.topItem}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Daily Best Sellers & Category Shares */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Daily Top Best Selling Items (ဘာတွေရောင်းရကောင်းလဲ) */}
              <div className={`p-5 rounded-2xl border ${themeStyles.card}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>{t('bar_title')} (ထိပ်တန်းအရောင်းရဆုံး)</span>
                  </h3>
                  <span className="text-xs font-semibold opacity-60">
                    {dateFilter === 'today' ? 'ယနေ့ရောင်းအား' : dateFilter === 'yesterday' ? 'မနေ့ကရောင်းအား' : 'ရွေးချယ်ထားသောကာလ'}
                  </span>
                </div>

                {dashboardStats.topItems.length === 0 ? (
                  <div className="py-12 text-center opacity-60 text-sm">
                    {t('no_record')}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {dashboardStats.topItems.map((item, idx) => {
                      const maxQty = dashboardStats.topItems[0].qty || 1;
                      const barPct = Math.round((item.qty / maxQty) * 100);

                      return (
                        <div key={item.name} className="p-3 rounded-xl bg-black/5 dark:bg-white/5 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                                #{idx + 1}
                              </span>
                              <span className="font-bold text-sm">{item.name}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 opacity-70">
                                {item.category}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="font-mono font-bold text-sm text-blue-600">
                                {item.qty} {t('items_count')}
                              </span>
                              <span className="block text-[11px] opacity-60 font-mono">
                                {formatMoney(item.revenue)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="w-full bg-black/10 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-500"
                              style={{ width: `${barPct}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Category Breakdown for selected period */}
              <div className={`p-5 rounded-2xl border ${themeStyles.card}`}>
                <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-purple-500" />
                  <span>{t('pie_title')}</span>
                </h3>

                {Object.keys(dashboardStats.catMap).length === 0 ? (
                  <div className="py-12 text-center opacity-60 text-sm">
                    {t('no_record')}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(dashboardStats.catMap).map(([catName, val], idx) => {
                      const pct = dashboardStats.totalSales > 0 ? Math.round((val / dashboardStats.totalSales) * 100) : 0;
                      const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500', 'bg-rose-500'];
                      const barColor = colors[idx % colors.length];

                      return (
                        <div key={catName} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-bold">
                            <span className="flex items-center gap-1.5">
                              <span className={`w-2.5 h-2.5 rounded-full ${barColor}`}></span>
                              {catName}
                            </span>
                            <span className="opacity-80 font-mono">{formatMoney(val)} ({pct}%)</span>
                          </div>
                          <div className="w-full bg-black/10 dark:bg-white/10 h-3 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all duration-500 ${barColor}`} style={{ width: `${pct}%` }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Time of Day Breakdown (မနက်၊ နေ့လယ်၊ ညနေ ရောင်းအား) */}
            <div className={`p-5 rounded-2xl border ${themeStyles.card}`}>
              <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>{t('time_breakdown')}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {Object.entries(dashboardStats.hourMap).map(([slotKey, slotData]) => (
                  <div key={slotKey} className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                    <p className="text-xs font-bold opacity-75">{slotData.label}</p>
                    <p className="text-lg font-mono font-black mt-1 text-blue-600">{formatMoney(slotData.sales)}</p>
                    <p className="text-[11px] opacity-60 mt-0.5">{slotData.orders} orders</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily History Breakdown Table */}
            {dashboardStats.dailyTrends.length > 0 && (
              <div className={`p-5 rounded-2xl border overflow-hidden ${themeStyles.card}`}>
                <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-500" />
                  <span>{t('daily_trend')}</span>
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse min-w-[400px]">
                    <thead className="border-b border-black/10 dark:border-white/10 opacity-70">
                      <tr>
                        <th className="pb-2">ရက်စွဲ (Date)</th>
                        <th className="pb-2">ဘောက်ချာ (Orders)</th>
                        <th className="pb-2 text-right">ရောင်းရငွေ (Sales)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5 dark:divide-white/5">
                      {dashboardStats.dailyTrends.map(day => (
                        <tr key={day.date} className="hover:bg-black/5 dark:hover:bg-white/5">
                          <td className="py-2.5 font-bold font-mono">{day.date}</td>
                          <td className="py-2.5">{day.orders} စောင်</td>
                          <td className="py-2.5 text-right font-mono font-bold text-emerald-600">{formatMoney(day.sales)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ===================== VIEW 3: MENU MANAGEMENT ===================== */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <UtensilsCrossed className="w-5 h-5 text-blue-500" />
                  <span>{t('menu_title')}</span>
                </h2>
                <p className="text-xs opacity-70">သင့်ဆိုင်သုံး မီနူးအသစ်များ ထည့်သွင်း/ဖျက်ပစ်ပါ</p>
              </div>

              {/* Clear Demo Data Button */}
              {menu.length > 0 && (
                <button
                  onClick={handleClearDemoData}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-600 bg-red-100 hover:bg-red-200 dark:bg-red-950/60 dark:text-red-400 rounded-xl transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t('clear_demo')}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Category Section */}
              <div className={`p-5 rounded-2xl border h-fit space-y-4 ${themeStyles.card}`}>
                <h3 className="font-bold text-base flex items-center gap-2">
                  <Plus className="w-4 h-4 text-blue-500" />
                  <span>{t('add_cat')}</span>
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder={t('cat_ph')}
                    className={`flex-1 px-3 py-2 text-sm rounded-xl border outline-none font-medium ${themeStyles.input}`}
                  />
                  <button
                    onClick={handleAddCategory}
                    className={`px-4 py-2 text-sm font-bold rounded-xl shadow-sm transition ${themeStyles.buttonPrimary}`}
                  >
                    {t('add_btn')}
                  </button>
                </div>

                <div className="pt-2">
                  <p className="text-xs font-bold opacity-70 mb-2">လက်ရှိ ကဏ္ဍများ:</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <span
                        key={cat}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                      >
                        {cat}
                        <button
                          onClick={() => handleRemoveCategory(cat)}
                          className="text-blue-500 hover:text-red-500 transition"
                          title="Delete category"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add Menu Item Form */}
              <div className={`lg:col-span-2 p-5 rounded-2xl border space-y-4 ${themeStyles.card}`}>
                <h3 className="font-bold text-base flex items-center gap-2">
                  <Plus className="w-4 h-4 text-emerald-500" />
                  <span>{t('add_menu')}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1 opacity-80">{t('name')}</label>
                    <input
                      type="text"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      placeholder="ဥပမာ - မုန့်ဟင်းခါး"
                      className={`w-full px-3 py-2 text-sm rounded-xl border outline-none font-medium ${themeStyles.input}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1 opacity-80">{t('price')}</label>
                    <input
                      type="number"
                      value={newItemPrice}
                      onChange={(e) => setNewItemPrice(e.target.value)}
                      placeholder="2500"
                      className={`w-full px-3 py-2 text-sm rounded-xl border outline-none font-medium ${themeStyles.input}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1 opacity-80">{t('category')}</label>
                    <select
                      value={newItemCategory}
                      onChange={(e) => setNewItemCategory(e.target.value)}
                      className={`w-full px-3 py-2 text-sm rounded-xl border outline-none font-medium ${themeStyles.input}`}
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1 opacity-80">{t('icon')}</label>
                    <input
                      type="text"
                      value={newItemIcon}
                      onChange={(e) => setNewItemIcon(e.target.value)}
                      placeholder="🍜 / ☕ / 🍰 / 🍗"
                      className={`w-full px-3 py-2 text-sm rounded-xl border outline-none font-medium ${themeStyles.input}`}
                    />
                  </div>
                </div>

                <button
                  onClick={handleAddMenuItem}
                  className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t('save')}</span>
                </button>
              </div>
            </div>

            {/* Menu Items Table */}
            <div className={`p-5 rounded-2xl border overflow-hidden ${themeStyles.card}`}>
              <h3 className="font-bold text-base mb-4">{t('curr_menu')} ({menu.length})</h3>
              
              {menu.length === 0 ? (
                <div className="py-12 text-center opacity-60 text-sm">
                  {t('clean_slate_notice')}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse min-w-[500px]">
                    <thead>
                      <tr className="border-b border-black/10 dark:border-white/10 opacity-70">
                        <th className="pb-3 pl-2">Icon</th>
                        <th className="pb-3">{t('name')}</th>
                        <th className="pb-3">{t('category')}</th>
                        <th className="pb-3">{t('price')}</th>
                        <th className="pb-3 text-right pr-2">{t('action')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5 dark:divide-white/5">
                      {menu.map((item) => (
                        <tr key={item.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition">
                          <td className="py-3 pl-2 text-2xl">{item.icon}</td>
                          <td className="py-3 font-bold">{item.name}</td>
                          <td className="py-3">
                            <span className="px-2.5 py-1 text-xs rounded-lg font-semibold bg-black/5 dark:bg-white/10">
                              {item.category}
                            </span>
                          </td>
                          <td className="py-3 font-mono font-bold text-blue-600">{formatMoney(item.price)}</td>
                          <td className="py-3 text-right pr-2">
                            <button
                              onClick={() => handleDeleteMenuItem(item.id)}
                              className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition"
                              title="Delete item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================== VIEW 4: SALES HISTORY ===================== */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Receipt className="w-5 h-5 text-blue-500" />
                <span>{t('hist_title')}</span>
              </h2>

              {history.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="flex items-center gap-1.5 text-xs font-bold text-red-600 bg-red-100 hover:bg-red-200 dark:bg-red-950/60 dark:text-red-400 px-3 py-1.5 rounded-xl transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t('clear_all')}</span>
                </button>
              )}
            </div>

            <div className={`rounded-2xl border overflow-hidden ${themeStyles.card}`}>
              {history.length === 0 ? (
                <div className="py-16 text-center space-y-2 opacity-60">
                  <Receipt className="w-10 h-10 mx-auto opacity-40" />
                  <p className="font-semibold text-sm">{t('no_record')}</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse min-w-[550px]">
                    <thead className="bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10 opacity-75">
                      <tr>
                        <th className="p-3 pl-4">{t('time')}</th>
                        <th className="p-3">{t('voucher_no')}</th>
                        <th className="p-3">{t('table')}</th>
                        <th className="p-3">{t('amount')}</th>
                        <th className="p-3 text-right pr-4">{t('action')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5 dark:divide-white/5">
                      {history.map((record) => (
                        <tr key={record.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition">
                          <td className="p-3 pl-4 text-xs font-medium opacity-80">{record.date}</td>
                          <td className="p-3 font-mono font-bold text-xs">{record.id}</td>
                          <td className="p-3 font-semibold">{t('table')} {record.tableId}</td>
                          <td className="p-3 font-mono font-bold text-emerald-600">{formatMoney(record.total)}</td>
                          <td className="p-3 text-right pr-4">
                            <button
                              onClick={() => {
                                setPrintReceiptData(record);
                                setTimeout(() => window.print(), 200);
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 rounded-lg text-xs font-bold transition"
                            >
                              <Printer className="w-3.5 h-3.5" />
                              <span>{t('reprint')}</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================== VIEW 5: SETTINGS ===================== */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-500" />
              <span>{t('set_title')}</span>
            </h2>

            {/* General Settings */}
            <div className={`p-5 rounded-2xl border space-y-4 ${themeStyles.card}`}>
              <h3 className="font-bold text-base pb-2 border-b border-black/10 dark:border-white/10">
                {t('general')}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold mb-1 opacity-80">{t('shop_name')}</label>
                  <input
                    type="text"
                    value={tempStoreName}
                    onChange={(e) => setTempStoreName(e.target.value)}
                    placeholder="သင့်ဆိုင်အမည်"
                    className={`w-full px-3 py-2 text-sm rounded-xl border outline-none font-bold ${themeStyles.input}`}
                  />
                  <p className="text-[11px] opacity-60 mt-1">ဤနေရာတွင် ထည့်သွင်းထားသော အမည်သည် ပြေစာဘောက်ချာနှင့် Header တွင် ပေါ်ပါမည်။</p>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1 opacity-80">{t('table_count')}</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={tempTableCount}
                    onChange={(e) => setTempTableCount(e.target.value)}
                    className={`w-28 px-3 py-2 text-sm rounded-xl border outline-none font-bold text-center ${themeStyles.input}`}
                  />
                </div>
              </div>
            </div>

            {/* Bluetooth Thermal Printer Section */}
            <div className={`p-5 rounded-2xl border space-y-4 ${themeStyles.card}`}>
              <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <Bluetooth className="w-4 h-4 text-indigo-500" />
                  <span>{t('bt_printer')}</span>
                </h3>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${btStatus === 'connected' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 dark:bg-slate-800 text-slate-600'}`}>
                  {btStatus === 'connected' ? (btDeviceName || t('bt_connected')) : t('bt_disconnected')}
                </span>
              </div>

              <button
                onClick={connectBluetoothPrinter}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition"
              >
                <Bluetooth className="w-4 h-4" />
                <span>{t('bt_printer')}</span>
              </button>
              <p className="text-xs opacity-70">
                * Chrome သို့မဟုတ် Edge browser ဖြင့် 58mm Bluetooth ESC/POS ပရင်တာကို တိုက်ရိုက်ချိတ်ဆက်နိုင်ပါသည်။
              </p>
            </div>

            {/* Theme Selector */}
            <div className={`p-5 rounded-2xl border space-y-4 ${themeStyles.card}`}>
              <h3 className="font-bold text-base pb-2 border-b border-black/10 dark:border-white/10">
                {t('theme_title')}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => setTheme('light')}
                  className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1.5 transition font-bold text-xs ${
                    theme === 'light' ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-slate-200 bg-white text-slate-800'
                  }`}
                >
                  <Sun className="w-5 h-5 text-amber-500" />
                  <span>{t('t_light')}</span>
                </button>

                <button
                  onClick={() => setTheme('dark')}
                  className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1.5 transition font-bold text-xs ${
                    theme === 'dark' ? 'border-indigo-500 bg-slate-900 text-white' : 'border-slate-700 bg-slate-800 text-slate-200'
                  }`}
                >
                  <Moon className="w-5 h-5 text-indigo-400" />
                  <span>{t('t_dark')}</span>
                </button>

                <button
                  onClick={() => setTheme('warm')}
                  className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1.5 transition font-bold text-xs ${
                    theme === 'warm' ? 'border-amber-600 bg-amber-100 text-amber-950' : 'border-amber-200 bg-amber-50 text-amber-900'
                  }`}
                >
                  <Coffee className="w-5 h-5 text-amber-700" />
                  <span>{t('t_warm')}</span>
                </button>

                <button
                  onClick={() => setTheme('green')}
                  className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1.5 transition font-bold text-xs ${
                    theme === 'green' ? 'border-emerald-600 bg-emerald-100 text-emerald-950' : 'border-emerald-200 bg-emerald-50 text-emerald-900'
                  }`}
                >
                  <Leaf className="w-5 h-5 text-emerald-600" />
                  <span>{t('t_green')}</span>
                </button>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveSettings}
              className={`w-full py-3.5 text-base font-bold rounded-xl shadow-lg transition active:scale-95 ${themeStyles.buttonPrimary}`}
            >
              {t('save_set')}
            </button>

            {/* Manual Install PWA trigger */}
            <button
              onClick={triggerPwaInstall}
              className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow flex items-center justify-center gap-2 transition"
            >
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>{t('install_app')} (PWA)</span>
            </button>
          </div>
        )}
      </main>

      {/* 3. TABLE ORDER MODAL / DRAWER */}
      {selectedTable && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-0 md:p-6 transition-opacity">
          <div className={`w-full md:max-w-5xl h-[92vh] md:h-[85vh] rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden border ${themeStyles.card}`}>
            
            {/* Modal Top Bar */}
            <div className="px-5 py-3.5 border-b flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                  {selectedTable}
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">
                    {t('table')} {selectedTable} {t('cart_title')}
                  </h3>
                  <p className="text-xs opacity-60">အော်ဒါစာရင်း ထည့်သွင်း/ပြင်ဆင်ပါ</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedTable(null)}
                className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content: Menu on Left, Cart on Right */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              
              {/* Menu Section */}
              <div className="flex-1 flex flex-col overflow-hidden border-b md:border-b-0 md:border-r border-black/10 dark:border-white/10">
                {/* Category Pills */}
                <div className="flex items-center gap-2 p-3 overflow-x-auto no-scrollbar shrink-0 border-b border-black/5 dark:border-white/5">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
                      selectedCategory === 'All' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'border-transparent hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    {t('all')}
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCategory(c)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
                        selectedCategory === c ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'border-transparent hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                {/* Items Grid */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 content-start">
                  {filteredMenuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => addToCart(item.id)}
                      className="p-3 rounded-2xl border text-center flex flex-col items-center justify-between hover:border-blue-500 hover:shadow-md transition active:scale-95 bg-black/5 dark:bg-white/5 group"
                    >
                      <span className="text-3xl mb-1 transition-transform group-hover:scale-110">{item.icon}</span>
                      <span className="text-xs font-bold line-clamp-2 leading-snug">{item.name}</span>
                      <span className="text-xs font-mono font-bold text-blue-600 mt-2 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md">
                        {formatMoney(item.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cart Section */}
              <div className="w-full md:w-80 lg:w-96 flex flex-col shrink-0 h-[40vh] md:h-full bg-black/5 dark:bg-white/5">
                <div className="p-3 font-bold text-xs uppercase tracking-wider opacity-70 border-b border-black/10 dark:border-white/10 text-center">
                  {t('cart_title')}
                </div>

                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                  {Object.keys(currentTableOrder).length === 0 ? (
                    <div className="py-12 text-center opacity-50 text-xs">
                      {t('empty_cart')}
                    </div>
                  ) : (
                    Object.entries(currentTableOrder).map(([itemId, qty]) => {
                      const item = menu.find(m => m.id === itemId);
                      if (!item) return null;
                      const subtotal = item.price * qty;

                      return (
                        <div
                          key={itemId}
                          className={`p-2.5 rounded-xl border flex items-center justify-between shadow-xs ${themeStyles.card}`}
                        >
                          <div className="flex-1 pr-2 overflow-hidden">
                            <p className="font-bold text-xs truncate">{item.name}</p>
                            <p className="text-[11px] font-mono text-blue-600 font-semibold">
                              {item.price.toLocaleString()} x {qty} = {subtotal.toLocaleString()} Ks
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => updateCartQty(itemId, -1)}
                              className="w-7 h-7 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center font-bold"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold font-mono">{qty}</span>
                            <button
                              onClick={() => updateCartQty(itemId, 1)}
                              className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 hover:bg-emerald-200 flex items-center justify-center font-bold"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Cart Checkout Footer */}
                <div className="p-4 border-t border-black/10 dark:border-white/10 space-y-3 bg-inherit">
                  <div className="flex justify-between items-center text-base font-bold">
                    <span>{t('total')}</span>
                    <span className="text-xl font-mono text-emerald-600">{formatMoney(currentTableTotal)}</span>
                  </div>

                  <button
                    disabled={currentTableTotal === 0}
                    onClick={handleCheckout}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:pointer-events-none text-white font-bold rounded-xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Printer className="w-5 h-5" />
                    <span>{t('print_btn')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. QUICK EDIT SHOP NAME MODAL */}
      {showEditNameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-2xl max-w-sm w-full space-y-4">
            <h3 className="font-bold text-base flex items-center gap-2">
              <Edit2 className="w-4 h-4 text-blue-500" />
              <span>{t('edit_name')}</span>
            </h3>
            <div>
              <label className="block text-xs font-bold mb-1 opacity-75">{t('shop_name')}</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="သင့်ဆိုင်အမည် ရိုက်ထည့်ပါ"
                className={`w-full px-3 py-2 text-sm rounded-xl border outline-none font-bold ${themeStyles.input}`}
                autoFocus
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowEditNameModal(false)}
                className="flex-1 py-2.5 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-sm transition"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleQuickRename}
                className="flex-1 py-2.5 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
              >
                {t('save')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. CUSTOM PWA INSTALL BANNER */}
      {showPwaBanner && (
        <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:w-96 z-40 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom duration-300">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Smartphone className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm leading-snug">{storeName} App</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{t('pwa_desc')}</p>
              
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={triggerPwaInstall}
                  className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg shadow transition flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t('install_btn')}</span>
                </button>
                <button
                  onClick={dismissPwaBanner}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-white transition"
                >
                  {t('dismiss')}
                </button>
              </div>
            </div>

            <button
              onClick={dismissPwaBanner}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 6. MODERN BOTTOM NAVIGATION */}
      <nav className={`fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-lg px-2 py-1.5 flex justify-around items-center ${themeStyles.nav}`}>
        <button
          onClick={() => setActiveTab('pos')}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition relative ${
            activeTab === 'pos' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'opacity-60 hover:opacity-100'
          }`}
        >
          <Armchair className="w-5 h-5" />
          <span className="text-[11px] mt-0.5">{t('tab_pos')}</span>
          {activeTableCount > 0 && (
            <span className="absolute top-1 right-2 w-4 h-4 bg-orange-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {activeTableCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition ${
            activeTab === 'dashboard' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'opacity-60 hover:opacity-100'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          <span className="text-[11px] mt-0.5">{t('tab_dash')}</span>
        </button>

        <button
          onClick={() => setActiveTab('menu')}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition ${
            activeTab === 'menu' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'opacity-60 hover:opacity-100'
          }`}
        >
          <UtensilsCrossed className="w-5 h-5" />
          <span className="text-[11px] mt-0.5">{t('tab_menu')}</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition ${
            activeTab === 'history' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'opacity-60 hover:opacity-100'
          }`}
        >
          <Receipt className="w-5 h-5" />
          <span className="text-[11px] mt-0.5">{t('tab_hist')}</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition ${
            activeTab === 'settings' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'opacity-60 hover:opacity-100'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span className="text-[11px] mt-0.5">{t('tab_set')}</span>
        </button>
      </nav>

      {/* 7. CUSTOM CONFIRM MODAL */}
      {confirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <p className="font-bold text-sm leading-relaxed">{confirmDialog.title}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDialog(null)}
                className="flex-1 py-2.5 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-sm transition"
              >
                {t('cancel')}
              </button>
              <button
                onClick={confirmDialog.onConfirm}
                className="flex-1 py-2.5 rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white text-sm transition"
              >
                {t('ok')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs sm:text-sm font-bold shadow-xl border border-slate-700 animate-in fade-in slide-in-from-top duration-200">
          {toastMessage}
        </div>
      )}

      {/* 9. THERMAL 58MM PRINT RECEIPT (CSS PRINT ONLY) */}
      <div id="print-area" className="hidden print:block print:w-[58mm] print:text-black print:p-1 print:font-mono print:text-xs">
        {printReceiptData && (
          <div>
            <div className="text-center font-bold text-sm mb-1">{storeName}</div>
            <div className="text-center text-[10px] mb-2">{t('receipt_title')}</div>
            <div className="border-t border-b border-dashed border-black py-1 my-1 text-[11px]">
              <div className="flex justify-between">
                <span>{t('table')}: <b>{printReceiptData.tableId}</b></span>
                <span>{printReceiptData.date}</span>
              </div>
              <div>No: {printReceiptData.id}</div>
            </div>
            <table className="w-full text-left my-2 text-[11px]">
              <thead>
                <tr className="border-b border-dashed border-black">
                  <th className="py-0.5">Item</th>
                  <th className="text-center py-0.5">Qty</th>
                  <th className="text-right py-0.5">Amt</th>
                </tr>
              </thead>
              <tbody>
                {printReceiptData.items.map((it, idx) => (
                  <tr key={idx}>
                    <td className="py-0.5 pr-1">{it.name}</td>
                    <td className="text-center py-0.5">{it.qty}</td>
                    <td className="text-right py-0.5">{it.subtotal.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="border-t border-dashed border-black pt-1 flex justify-between font-bold text-xs">
              <span>{t('total')}</span>
              <span>{printReceiptData.total.toLocaleString()} Ks</span>
            </div>
            <div className="text-center text-[10px] mt-4">
              <p>ကျေးဇူးတင်ပါသည်</p>
              <p>Thank You! Please Come Again</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
