<strong>Menu item title:</strong> <?php print $sync_info['title']; ?><br />
<strong>Originally synced:</strong> <?php print format_date($sync_info['timestamp'], 'medium'); ?><br />
<strong>Synced by:</strong> <?php print $sync_info['name']; ?><br /><br />
<?php foreach($sync_items as $site_name => $sync_item): ?>
  <?php
  $domain = pgc_sync_get_domain_from_sitename($site_name);
  $domain = $domain[$site_name];
  $edit_link = $domain.'/admin/structure/menu/manage/main-menu';
  ?>
<table>
  <thead>
    <th>Site Name: <?php print $site_name; ?></th>
    <th>Status: <?php print pgc_sync_get_status_string($sync_info['status']); ?></th>
  </thead>
  <tbody>
  <?php if($sync_item['status'] == PGC_SYNC_SUCCESSFUL):  ?>
    <tr class="no-changes">
      <td colspan="2"><strong>Status:</strong> <?php print pgc_sync_get_status_string($sync_item['status']); ?></td>
    </tr>
  <?php else: ?>
    <tr class="overridden top">
      <td><strong>Status:</strong> <?php print pgc_sync_get_status_string($sync_item['status']); ?></td>
      <td><strong>Error:</strong> <?php print pgc_sync_get_status_string($sync_item['error']); ?></td>
    </tr>
  <?php endif; ?>
  <?php if($sync_info['status'] != PGC_SYNC_SUCCESSFUL): ?>
    <tr>
      <td colspan="2">
        <a href="<?php print $edit_link; ?>">Edit menu on client site</a>
      </td>
    </tr>
  <?php endif; ?>
  </tbody>
</table>
<?php endforeach; ?>