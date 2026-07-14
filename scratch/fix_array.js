const fs = require('fs');
const path = 'C:\\\\Users\\\\mahmu\\\\OneDrive\\\\Desktop\\\\New\\\\asman-dashboard\\\\src\\\\data\\\\detentionWatchData.js';
let lines = fs.readFileSync(path, 'utf8').split('\n');

// We need to delete lines 40 to 86 (0-indexed 39 to 85)
// Let's verify line 40 is "// Detention Watch — national ICE detention intelligence data."
if (lines[39].includes('Detention Watch')) {
  lines.splice(39, 47);
  fs.writeFileSync(path, lines.join('\n'), 'utf8');
  console.log('Successfully removed duplicated chunk.');
} else {
  console.log('Line 40 does not match. It is:', lines[39]);
}
