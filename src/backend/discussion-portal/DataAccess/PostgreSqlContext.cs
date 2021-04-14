using DiscussionPortal.Records;
using Microsoft.EntityFrameworkCore;

namespace DiscussionPortal.DataAccess
{
    public class PostgreSqlContext : DbContext
    {
        public PostgreSqlContext(DbContextOptions<PostgreSqlContext> options) : base(options)
        {
        }

        public DbSet<DiscussionPostRecord> DiscussionPosts { get; set; }
        public DbSet<DiscussionPostTagRecord> DiscussionPostTags { get; set; }
        public DbSet<DiscussionPostLikeRecord> DiscussionPostLikes { get; set; }

        public DbSet<UserDto> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<DiscussionPostTagRecord>()
                .HasOne(p => p.DiscussionPost)
                .WithMany(b => b.Tags)
                .HasForeignKey(p => p.DiscussionPostId);

            //builder.Entity<DiscussionPostLikeRecord>()
            //    .HasOne(p => p.DiscussionPost)
            //    .WithMany(b => b.Likes)
            //    .HasForeignKey(p => p.DiscussionPostId);

            base.OnModelCreating(builder);
            builder.Entity<DiscussionPostLikeRecord>()
                .HasKey(c => new { c.DiscussionPostId, c.UserName });
        }

        public override int SaveChanges()
        {
            ChangeTracker.DetectChanges();
            return base.SaveChanges();
        }
    }
}
