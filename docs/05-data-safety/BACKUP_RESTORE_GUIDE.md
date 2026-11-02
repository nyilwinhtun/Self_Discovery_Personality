# Self Discovery — JSON Backup / Restore Guide

## What is included in a backup?

A backup contains the app's LocalStorage data, including:

- Unfinished assessment drafts and saved answers.
- Skipped-question lists and resume positions stored in each draft.
- Completed assessment records and result scores.
- Additional app data stored in the same app data object as future modules are added.

The backup is a versioned JSON file named `self-discovery-backup-YYYY-MM-DD.json`.

## Export a backup

1. Open Self Discovery's Home page.
2. Scroll to **သင့်ရဲ့ အချက်အလက်တွေကို အရန်သိမ်းထားပါ**.
3. Select **JSON Backup ထုတ်ယူမယ်**.
4. Keep the downloaded JSON file somewhere private, preferably in a second location as well.

## Restore a backup

1. Open the same Home page on the browser/device where you want the data restored.
2. Select **Backup ဖိုင် ပြန်ထည့်မယ်** and choose the Self Discovery JSON backup.
3. Review the number of drafts and completed records shown in the confirmation dialog.
4. Choose one of the following modes:

### Merge (recommended)

- Keeps the data already in the current browser.
- Adds drafts and history that are only present in the backup.
- If the same assessment draft exists in both places, the draft with the newer `updatedAt` timestamp is kept.
- If the same history ID exists in both places, it is kept once.

### Replace

- Replaces current app data with the contents of the selected backup.
- Current drafts/results that are not in the backup will be removed.
- Export a fresh backup before using Replace if you may need the current data later.

## Privacy and limitations

- Backup files can contain personal assessment answers and results. Do not share them publicly or upload them to an untrusted website.
- The JSON backup is not encrypted. Protect the file using your device's normal file security or an encrypted drive if needed.
- LocalStorage remains local to the browser and device. Backup/Restore is a manual way to move data; it is not automatic cloud synchronization.
- Browser storage may be cleared by the user or browser. Export backups regularly, especially before clearing site data or moving to another device.
- The app currently accepts JSON backup files up to 10 MB.
