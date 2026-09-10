const faq = [
  {
    question: "What is an IP calculator?",
    answer:
      "An IP calculator calculates network information from an IPv4 address and CIDR prefix. It can determine the network address, broadcast address, subnet mask, wildcard mask, usable host range, and address counts.",
  },
  {
    question: "What is CIDR?",
    answer:
      "CIDR stands for Classless Inter-Domain Routing. CIDR notation represents an IPv4 network using an IP address followed by a prefix length, such as 192.168.1.0/24.",
  },
  {
    question: "What does /24 mean in CIDR?",
    answer:
      "A /24 prefix means that the first 24 bits are used for the network portion of the IPv4 address. A /24 network contains 256 IPv4 addresses.",
  },
  {
    question: "How many usable hosts are in a /24 subnet?",
    answer:
      "A traditional /24 IPv4 subnet contains 256 addresses. For a normal subnet, 254 are usable host addresses because the network and broadcast addresses are reserved.",
  },
  {
    question: "What is a subnet mask?",
    answer:
      "A subnet mask identifies which portion of an IPv4 address represents the network and which portion represents hosts. For example, /24 corresponds to 255.255.255.0.",
  },
  {
    question: "What is a wildcard mask?",
    answer:
      "A wildcard mask is the inverse of a subnet mask. For example, the wildcard mask for 255.255.255.0 is 0.0.0.255.",
  },
  {
    question: "What is a network address?",
    answer:
      "The network address identifies the subnet itself. It is the first address in the calculated CIDR range.",
  },
  {
    question: "What is a broadcast address?",
    answer:
      "The broadcast address is the last address in an IPv4 subnet and is traditionally used to send traffic to all hosts on that subnet.",
  },
  {
    question: "What is the difference between /31 and /32?",
    answer:
      "A /31 contains two IPv4 addresses and is commonly useful for point-to-point links. A /32 represents exactly one IPv4 address.",
  },
  {
    question: "Can I calculate private IP ranges?",
    answer:
      "Yes. The calculator recognizes common private IPv4 ranges such as 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16.",
  },
  {
    question: "Does this calculator support IPv6?",
    answer:
      "No. This version of the tool focuses on IPv4 and IPv4 CIDR calculations.",
  },
  {
    question: "Does this tool send my IP address to a server?",
    answer:
      "No. The IPv4 and CIDR calculations are performed directly in your browser.",
  },
];

export default faq;