const IPV4_PARTS = 4;

function assertValidOctet(value, label) {
  if (!Number.isInteger(value) || value < 0 || value > 255) {
    throw new Error(`${label} must be between 0 and 255.`);
  }
}

export function parseIPv4(ip) {
  const value = String(ip ?? "").trim();

  if (!value) {
    throw new Error("Enter an IPv4 address.");
  }

  const parts = value.split(".");

  if (parts.length !== IPV4_PARTS) {
    throw new Error(
      "IPv4 address must contain exactly four octets."
    );
  }

  const numbers = parts.map((part, index) => {
    if (!/^\d+$/.test(part)) {
      throw new Error(
        `IPv4 octet ${index + 1} must contain only numbers.`
      );
    }

    const number = Number(part);

    assertValidOctet(
      number,
      `IPv4 octet ${index + 1}`
    );

    return number;
  });

  return numbers;
}

export function ipv4ToNumber(ip) {
  const [a, b, c, d] = parseIPv4(ip);

  return (
    ((a << 24) >>> 0) +
    ((b << 16) >>> 0) +
    ((c << 8) >>> 0) +
    d
  );
}

export function numberToIPv4(value) {
  const number = Number(value) >>> 0;

  return [
    (number >>> 24) & 255,
    (number >>> 16) & 255,
    (number >>> 8) & 255,
    number & 255,
  ].join(".");
}

export function parseCIDR(cidr) {
  const value = String(cidr ?? "").trim();

  if (!value) {
    throw new Error("Enter a CIDR prefix.");
  }

  const normalized = value.startsWith("/")
    ? value.slice(1)
    : value;

  if (!/^\d+$/.test(normalized)) {
    throw new Error(
      "CIDR prefix must be a number between 0 and 32."
    );
  }

  const prefix = Number(normalized);

  if (prefix < 0 || prefix > 32) {
    throw new Error(
      "CIDR prefix must be between 0 and 32."
    );
  }

  return prefix;
}

export function prefixToSubnetMask(prefix) {
  if (prefix === 0) {
    return "0.0.0.0";
  }

  const mask =
    (0xffffffff << (32 - prefix)) >>> 0;

  return numberToIPv4(mask);
}

export function prefixToWildcardMask(prefix) {
  const mask =
    prefix === 0
      ? 0
      : (0xffffffff << (32 - prefix)) >>> 0;

  return numberToIPv4(
    (~mask) >>> 0
  );
}

export function getAddressType(ipNumber) {
  const first =
    (ipNumber >>> 24) & 255;

  const second =
    (ipNumber >>> 16) & 255;

  if (
    first === 10 ||
    (first === 172 &&
      second >= 16 &&
      second <= 31) ||
    (first === 192 && second === 168)
  ) {
    return "Private";
  }

  if (
    first === 127
  ) {
    return "Loopback";
  }

  if (
    first >= 224 &&
    first <= 239
  ) {
    return "Multicast";
  }

  if (
    first === 169 &&
    second === 254
  ) {
    return "Link-local";
  }

  if (ipNumber === 0) {
    return "Unspecified";
  }

  if (
    first === 255 &&
    second === 255
  ) {
    return "Broadcast";
  }

  return "Public";
}

export function getUsableHostCount(prefix) {
  if (prefix === 32) {
    return 1;
  }

  if (prefix === 31) {
    return 2;
  }

  const total =
    2 ** (32 - prefix);

  return Math.max(
    total - 2,
    0
  );
}

export function getTotalAddressCount(prefix) {
  return 2 ** (32 - prefix);
}

export function numberToBinary(value) {
  return [
    (value >>> 24) & 255,
    (value >>> 16) & 255,
    (value >>> 8) & 255,
    value & 255,
  ]
    .map((octet) =>
      octet
        .toString(2)
        .padStart(8, "0")
    )
    .join(".");
}

export function calculateSubnet(
  ip,
  cidr
) {
  const ipNumber =
    ipv4ToNumber(ip);

  const prefix =
    parseCIDR(cidr);

  const subnetMask =
    prefix === 0
      ? 0
      : (0xffffffff << (32 - prefix)) >>> 0;

  const networkNumber =
    (ipNumber & subnetMask) >>> 0;

  const broadcastNumber =
    (
      networkNumber |
      (~subnetMask >>> 0)
    ) >>> 0;

  const totalAddresses =
    getTotalAddressCount(prefix);

  const usableHostCount =
    getUsableHostCount(prefix);

  let firstUsable = null;
  let lastUsable = null;

  if (prefix === 32) {
    firstUsable =
      numberToIPv4(networkNumber);

    lastUsable =
      numberToIPv4(networkNumber);
  } else if (prefix === 31) {
    firstUsable =
      numberToIPv4(networkNumber);

    lastUsable =
      numberToIPv4(broadcastNumber);
  } else {
    firstUsable =
      numberToIPv4(
        (networkNumber + 1) >>> 0
      );

    lastUsable =
      numberToIPv4(
        (broadcastNumber - 1) >>> 0
      );
  }

  return {
    inputIp: String(ip).trim(),
    cidr: prefix,
    cidrNotation: `${numberToIPv4(
      ipNumber
    )}/${prefix}`,

    addressType:
      getAddressType(ipNumber),

    subnetMask:
      prefixToSubnetMask(prefix),

    wildcardMask:
      prefixToWildcardMask(prefix),

    networkAddress:
      numberToIPv4(networkNumber),

    broadcastAddress:
      numberToIPv4(broadcastNumber),

    firstUsableIp: firstUsable,

    lastUsableIp: lastUsable,

    totalAddresses,

    usableHostCount,

    prefix,

    ipBinary:
      numberToBinary(ipNumber),

    subnetMaskBinary:
      numberToBinary(
        subnetMask
      ),

    networkBinary:
      numberToBinary(
        networkNumber
      ),

    broadcastBinary:
      numberToBinary(
        broadcastNumber
      ),
  };
}

export function validateIPv4CIDR(
  ip,
  cidr
) {
  try {
    calculateSubnet(ip, cidr);

    return {
      valid: true,
      message:
        "Valid IPv4 address and CIDR prefix.",
    };
  } catch (error) {
    return {
      valid: false,
      message:
        error?.message ||
        "Invalid IPv4 address or CIDR prefix.",
    };
  }
}

export function createDownloadContent(
  result
) {
  if (!result) {
    return "";
  }

  return [
    `IP Address: ${result.inputIp}`,
    `CIDR: /${result.cidr}`,
    `CIDR Notation: ${result.cidrNotation}`,
    `Address Type: ${result.addressType}`,
    "",
    `Subnet Mask: ${result.subnetMask}`,
    `Wildcard Mask: ${result.wildcardMask}`,
    `Network Address: ${result.networkAddress}`,
    `Broadcast Address: ${result.broadcastAddress}`,
    `First Usable IP: ${result.firstUsableIp}`,
    `Last Usable IP: ${result.lastUsableIp}`,
    `Total Addresses: ${result.totalAddresses}`,
    `Usable Hosts: ${result.usableHostCount}`,
    "",
    `IP Binary: ${result.ipBinary}`,
    `Subnet Mask Binary: ${result.subnetMaskBinary}`,
    `Network Binary: ${result.networkBinary}`,
    `Broadcast Binary: ${result.broadcastBinary}`,
  ].join("\n");
}

export const CIDR_PRESETS = [
  {
    cidr: "8",
    description:
      "16,777,216 addresses",
  },
  {
    cidr: "16",
    description:
      "65,536 addresses",
  },
  {
    cidr: "20",
    description:
      "4,096 addresses",
  },
  {
    cidr: "24",
    description:
      "256 addresses",
  },
  {
    cidr: "25",
    description:
      "128 addresses",
  },
  {
    cidr: "26",
    description:
      "64 addresses",
  },
  {
    cidr: "27",
    description:
      "32 addresses",
  },
  {
    cidr: "28",
    description:
      "16 addresses",
  },
  {
    cidr: "29",
    description:
      "8 addresses",
  },
  {
    cidr: "30",
    description:
      "4 addresses",
  },
  {
    cidr: "31",
    description:
      "2 addresses",
  },
  {
    cidr: "32",
    description:
      "1 address",
  },
];