#include "eth_internals.h"

uint8_t add_uint256(uint8_t *a, uint8_t *b) {
  uint8_t carry = 0;
  for (uint8_t i = INT256_LENGTH - 1; i > 0; i--) {
    uint16_t added = a[i] + b[i] + carry;
    a[i] += b[i] + carry;
    carry = (added > 255) ? 1 : 0;
  }
  uint16_t added = a[0] + b[0] + carry;
  if (added > 255)
    return 1;
  a[0] += b[0] + carry;
  return 0;
}