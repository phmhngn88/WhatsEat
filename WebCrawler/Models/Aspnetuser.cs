﻿using System;
using System.Collections.Generic;

namespace WebCrawler.Models
{
    public partial class Aspnetuser
    {
        public Aspnetuser()
        {
            Aspnetuserclaims = new HashSet<Aspnetuserclaim>();
            Aspnetuserlogins = new HashSet<Aspnetuserlogin>();
            Aspnetusertokens = new HashSet<Aspnetusertoken>();
            Refreshtokens = new HashSet<Refreshtoken>();
            Shippers = new HashSet<Shipper>();
            Stores = new HashSet<Store>();
            Roles = new HashSet<Aspnetrole>();
        }

        public string Id { get; set; } = null!;
        public string? UserName { get; set; }
        public string? NormalizedUserName { get; set; }
        public string? Email { get; set; }
        public string? NormalizedEmail { get; set; }
        public bool EmailConfirmed { get; set; }
        public string? PasswordHash { get; set; }
        public string? SecurityStamp { get; set; }
        public string? ConcurrencyStamp { get; set; }
        public string? PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public bool TwoFactorEnabled { get; set; }
        public DateTime? LockoutEnd { get; set; }
        public bool LockoutEnabled { get; set; }
        public int AccessFailedCount { get; set; }

        public virtual ICollection<Aspnetuserclaim> Aspnetuserclaims { get; set; }
        public virtual ICollection<Aspnetuserlogin> Aspnetuserlogins { get; set; }
        public virtual ICollection<Aspnetusertoken> Aspnetusertokens { get; set; }
        public virtual ICollection<Refreshtoken> Refreshtokens { get; set; }
        public virtual ICollection<Shipper> Shippers { get; set; }
        public virtual ICollection<Store> Stores { get; set; }

        public virtual ICollection<Aspnetrole> Roles { get; set; }
    }
}
